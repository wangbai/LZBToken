pragma solidity ^0.4.19;


/**
 * @title Destroyable token
 */
contract Destroyable {
    event DestroyToken(address indexed _owner, uint256 _value);

    /**
     * @dev When transfering  old token to new token, destroy
     * the account and token of msg.sender address forever
     */   
    function destroy() public; 

    /**
     * @dev return whether the account of the owner is destroyed
     */ 
    function isDestroyedOf(address _owner) public view returns (bool);

    /**
     * @dev return total destroyed token value of the owner
     */ 
    function destroyedBalanceOf(address _owner) public view returns (uint256);
}//END OF Destroyable
