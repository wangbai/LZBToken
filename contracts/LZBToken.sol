pragma solidity ^0.4.19;
 
import "./control/Pausable.sol"; 
import "./token/DestroyableToken.sol";


contract LZBToken is DestroyableToken, Pausable {
    uint256 constant TOTAL_VALUE = 10000 * (10 ** 18);

    string public name = "LZBToken";
    string public symbol = "LZBT";
    uint256 public decimals = 18;
    string public code = "LZB 1.0"; 
   
    function LZBToken() public {
        totalSupply = TOTAL_VALUE;
        balances[owner] = TOTAL_VALUE;
        Transfer(0x0, owner, TOTAL_VALUE);
    }

    function() public payable {
        revert();
    }

    function kill() public {
        selfdestruct(owner);
    }

    function transfer(address _to, uint256 _value) onlyNotPaused public returns (bool) {
        return super.transfer(_to, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) onlyNotPaused public returns (bool) {
        return super.transferFrom(_from, _to, _value);
    }
}//END OF LZBToken
