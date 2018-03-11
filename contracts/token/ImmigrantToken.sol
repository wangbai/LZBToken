pragma solidity ^0.4.19;

import "./DestroyableToken.sol";


/**
 * @title Immigrant ERC20 Token
 * @dev Accept the token from the specific address of Emmigrant Token
 */
contract ImmigrantToken is DestroyableToken {
    using TokenMath for uint256;

    address public emmigrantContractAddress;
    
    mapping(address => bool) internal inflowed;
    
    event Inflow(address indexed _owner, uint256 _value);  

    function inflow() public {
        require(emmigrantContractAddress != address(0));
        require(msg.sender != address(0));
        require(!inflowed[msg.sender]);
        
        Destroyable et = Destroyable(emmigrantContractAddress);
        et.destroy();
               
        uint256 inflowValue = et.destroyedBalanceOf(msg.sender);
        assert(inflowValue != 0);

        balances[msg.sender] = balances[msg.sender].add(inflowValue);
        inflowed[msg.sender] = true;
        allSupply = allSupply.add(inflowValue);

        Inflow(msg.sender, inflowValue);
    }
}//END OF ImmigrantToken
