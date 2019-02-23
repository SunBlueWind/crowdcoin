const assert = require("assert").strict;
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const compiledCampaign = require("../ethereum/build/Campaign.json");
const compiledCampaignFactory = require("../ethereum/build/CampaignFactory.json");

let accounts;
let manager;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  manager = accounts[0];
  factory = await new web3.eth.Contract(
    JSON.parse(compiledCampaignFactory.interface)
  )
    .deploy({ data: compiledCampaignFactory.bytecode })
    .send({ from: manager, gas: "1000000" });

  await factory.methods.createCampaign("100").send({
    from: manager,
    gas: "1000000"
  });
  [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
  campaign = await new web3.eth.Contract(
    JSON.parse(compiledCampaign.interface),
    campaignAddress
  );
});

describe("Campaign", () => {
  it("deploys Campaign and CampaignFactory", () => {
    assert.ok(campaignAddress);
    assert.ok(factory.options.address);
  });

  it("marks the caller as the manager", async () => {
    const campaignManager = await campaign.methods.manager().call();
    assert.strictEqual(campaignManager, manager);
  });

  it("allows people to contribute and marks them as contributor", async () => {
    const sender = accounts[1];
    await campaign.methods.contribute().send({
      from: sender,
      value: "200"
    });
    const isContributor = await campaign.methods.contributors(sender).call();
    assert.ok(isContributor);
  });

  it("requires a minimum contribution", async () => {
    assert.rejects(async () => {
      await campaign.methods.contribute().send({
        from: accounts[1],
        value: "50"
      });
    });
  });

  it("allows manager to create request", async () => {
    const description = "test";
    const amount = "66";
    const recipient = accounts[2];
    await campaign.methods.contribute().send({
      from: accounts[1],
      value: "666"
    });
    await campaign.methods.createRequest(description, amount, recipient).send({
      from: manager,
      gas: "1000000"
    });
    const request = await campaign.methods.requests(0).call();
    assert.strictEqual(request.description, description);
    assert.strictEqual(request.amount, amount);
    assert.strictEqual(request.recipient, recipient);
    assert.strictEqual(request.completed, false);
    assert.strictEqual(request.approversCount, "0");
  });

  it("can process request", async () => {
    const description = "test";
    const amount = web3.utils.toWei("5", "ether");
    const recipient = accounts[2];
    const contributor = accounts[1];
    await campaign.methods.contribute().send({
      from: contributor,
      value: web3.utils.toWei("10", "ether")
    });
    await campaign.methods.createRequest(description, amount, recipient).send({
      from: manager,
      gas: "1000000"
    });
    await campaign.methods.approveRequest(0).send({
      from: contributor,
      gas: "1000000"
    });
    let beforeBalance = await web3.eth.getBalance(recipient);
    beforeBalance = web3.utils.fromWei(beforeBalance, "ether");
    beforeBalance = parseFloat(beforeBalance);
    await campaign.methods.finalizeRequest(0).send({
      from: manager,
      gas: "1000000"
    });
    let afterBalance = await web3.eth.getBalance(recipient);
    afterBalance = web3.utils.fromWei(afterBalance, "ether");
    afterBalance = parseFloat(afterBalance);
    assert.strictEqual(afterBalance - beforeBalance, 5);
  });
});
