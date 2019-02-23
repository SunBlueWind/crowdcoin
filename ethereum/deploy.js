const HdWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const fs = require("fs-extra");
const path = require("path");
const compiledFactory = require("./build/CampaignFactory.json");

const { interface, bytecode } = compiledFactory;
const provider = new HdWalletProvider(
  "paddle drop loyal seed grid undo bean hurdle device swift coach spell",
  "https://rinkeby.infura.io/v3/cc1afc77f27d4e90b2df2affdc4c102e"
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log("Will deploy to account", accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: "0x" + bytecode
    })
    .send({
      from: accounts[0]
    });
  console.log("Result at", result.options.address);
  fs.writeFileSync(
    path.resolve(__dirname, "address.txt"),
    result.options.address
  );
};

deploy();
