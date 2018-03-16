pragma solidity ^0.4.19;

import "./Destroyable.sol";
import "./StandardToken.sol";


/**
 * @title Destroyable ERC20 token
 */
contract DestroyableToken is StandardToken, Destroyable {
    using TokenMath for uint256;

    mapping(address => bool) public destroyed;

    function destroy() public {
        require(!destroyed[msg.sender]);
        require(balances[msg.sender] != 0);
        
        destroyed[msg.sender] = true;
        allSupply = allSupply.sub(balances[msg.sender]);

        DestroyToken(msg.sender, balances[msg.sender]);
    }


    /**
     * @dev return total destroyed token value of the owner
     */
    function isDestroyedOf(address _owner) public view returns (bool) {
        return destroyed[_owner];
    }

    function destroyedBalanceOf(address _owner) public view returns (uint256) {
        if (destroyed[_owner]) {
            return balances[_owner];
        }

        return 0;
    }

    function balanceOf(address _owner) public view returns (uint256 balance) {
        if (destroyed[_owner]) {
            return 0;
        }

        return balances[_owner];
    }

    function transfer(address _to, uint256 _value) public returns (bool) {
        require(!destroyed[msg.sender]);
        require(!destroyed[_to]);

        return super.transfer(_to, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool) {
        require(!destroyed[_from]);
        require(!destroyed[_to]);

        return super.transferFrom(_from, _to, _value);
    }
}//END OF DestroyableToken
