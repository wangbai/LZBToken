var LZBToken = artifacts.require("./LZBToken.sol");

module.exports = function(deployer) {
  deployer.deploy(LZBToken);
};
