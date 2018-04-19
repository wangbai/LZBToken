var program = require('commander');

// init web3
var Web3 = require("web3");
var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider("http://localhost:7545"));

var version = web3.version.node;
console.log(version);
