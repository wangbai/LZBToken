var LZBToken = artifacts.require("./LZBToken.sol");

contract('LZBToken', function(accounts) {

var owner = "0x627306090abaB3A6e1400e9345bC60c78a8BEf57";

var account1 = "0xf17f52151EbEF6C7334FAD080c5704D77216b732";
var account2 = "0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef";

//Test Initial Owner Balance 
it("should put all tokens in the owner's account", function() {
    var lzbToken;
    var balanceOfOwner;
    var totalSupply;

    return LZBToken.deployed().then(function(instance) {
        lzbToken = instance;
        return lzbToken.balanceOf.call(owner);
    }).then(function(balance) {
        balanceOfOwner = balance.valueOf();
        return lzbToken.totalSupply.call();
    }).then(function(balance) {
        totalSupply = balance.valueOf();

        assert.equal(balanceOfOwner, totalSupply, "Initially owner has all");
        assert.equal(balanceOfOwner, (10 ** 8) * (10 ** 18), "Owner has " + (10 ** 8) * (10 ** 18));
    });
});

//Test transfer 
it("should put valid tokens in the account of account1 and account2", function() {
    var lzbToken;
    return LZBToken.deployed().then(function(instance) {
        lzbToken = instance;
        return lzbToken.transfer(account1, 1000 * (10 ** 18), {from: owner});
    }).then(function(ret) {
        return lzbToken.transfer(account2, 5000 * (10 ** 18), {from: owner});
    }).then(function(ret) {
        return lzbToken.totalSupply.call();
    }).then(function(balance) {
        totalSupply = balance.valueOf();

        assert.equal(totalSupply, (10 ** 8) * (10 ** 18), "Total supply  has " + (10 ** 8) * (10 ** 18));
        return lzbToken.balanceOf.call(account1);
    }).then(function(balance1) {
        assert.equal(balance1.valueOf(), 1000 * (10 ** 18), "Account1 is right");
        return lzbToken.balanceOf.call(account2);
    }).then(function(balance2) {
        assert.equal(balance2.valueOf(), 5000 * (10 ** 18), "Account2 is right");
        return lzbToken.balanceOf.call(owner);
    }).then(function(totalSupply) {
        assert.equal(totalSupply.valueOf(), 9.9994e+25, "Owner is right");
    });
});

//Test approve and transferFrom
it("should approve the allowance", function() {
    var lzbToken;

    return LZBToken.deployed().then(function(instance) {
        lzbToken = instance;
        return lzbToken.approve(account1, 10000 * (10 ** 18), {from: account2});
    }).then(function(ret) {
        return lzbToken.allowance.call(account2, account1);
    }).then(function(allowance) {
        assert.equal(allowance.valueOf(), 10000 * (10 ** 18), "account2 give account1 " +  4000 * (10 ** 18));
   
        return lzbToken.approve(account1, 0, {from: account2});
    }).then(function(ret) {
        return  lzbToken.allowance.call(account2, account1);
    }).then(function(allowance) {
        assert.equal(allowance.valueOf(), 0, "account2 give account1 " + 0);
        
        return lzbToken.approve(account1, 10000 * (10 ** 18), {from: account2});
    }).then(function(ret) {
        return lzbToken.transferFrom(account2, account1, 2000 * (10 ** 18), {from: account1});
    }).then(function(ret) {
        return lzbToken.balanceOf.call(account1);
    }).then(function(balance1) {
        assert.equal(balance1.valueOf(), 3000 * (10 ** 18), "Account1 is right");
        return lzbToken.balanceOf.call(account2);
    }).then(function(balance2) {
        assert.equal(balance2.valueOf(), 3000 * (10 ** 18), "Account2 is right");
        return lzbToken.allowance.call(account2, account1);
    }).then(function(allowance) {
        assert.equal(allowance.valueOf(), 8000 * (10 ** 18), "account2 give account1 " +  8000 * (10 ** 18));
        return lzbToken.totalSupply.call();
    }).then(function(totalSupply) {
        assert.equal(totalSupply.valueOf(), (10 ** 8) * (10 ** 18), "Total supply  has " + (10 ** 8) * (10 ** 18));
    });
});

//Test Destroy
it("should support to destroy", function() {
    var lzbToken;

    return LZBToken.deployed().then(function(instance) {
        lzbToken = instance;
        return lzbToken.destroy({from: account2});
    }).then(function(ret) {
        return lzbToken.destroyedBalanceOf.call(account2);
    }).then(function(balance) {
        assert.equal(balance.valueOf(), 3000 * (10 ** 18), "account2 destroy " + 3000 * (10 ** 18) + " token");
        return lzbToken.totalSupply.call();
    }).then(function(totalSupply) {
        assert.equal(totalSupply.valueOf(), 9.9997e+25, "Total supply is right");
    });
});

});//END OF TEST UNITS
