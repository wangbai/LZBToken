pragma solidity ^0.4.19;


/**
 * @title ERC20
 * @dev ERC20 Token Standard, https://github.com/ethereum/EIPs/blob/master/EIPS/eip-20.md
 */
contract ERC20 {
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);  
    
    function totalSupply() public constant returns (uint256);
    function balanceOf(address _owner) public constant returns (uint256);
    function transfer(address _to, uint256 _value) public returns (bool);
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool);
    function approve(address _spender, uint256 _value) public returns (bool);
    function allowance(address _owner, address _spender) public constant returns (uint256);
}//END OF ERC20
