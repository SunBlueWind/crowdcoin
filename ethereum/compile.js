const solc = require("solc");
const fs = require("fs-extra");
const path = require("path");

const buildPath = path.resolve(__dirname, "build");
const sourcePath = path.resolve(__dirname, "contracts", "Campaign.sol");

fs.removeSync(buildPath);
const source = fs.readFileSync(sourcePath, "utf8");

const compiledContracts = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath);

for (let contract in compiledContracts) {
  fs.writeJSONSync(
    path.resolve(buildPath, `${contract.replace(":", "")}.json`),
    compiledContracts[contract]
  );
}
