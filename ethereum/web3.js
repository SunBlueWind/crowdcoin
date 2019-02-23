const Web3 = require("web3");
let provider;

if (typeof window !== "undefined" && typeof window.web3 !== "undefined") {
  provider = window.web3.currentProvider;
} else {
  provider = new Web3.providers.HttpProvider(
    "https://rinkeby.infura.io/v3/cc1afc77f27d4e90b2df2affdc4c102e"
  );
}

const web3 = new Web3(provider);

export default web3;
