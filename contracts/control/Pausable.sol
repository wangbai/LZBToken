pragma solidity ^0.4.19;

import "./Ownable.sol";


/**
 * @title Pausable
 * @dev Base contract which allows children to implement an emergency stop mechanism.
 */
contract Pausable is Ownable {
    bool public paused = false;

    event Pause();
    event Unpause();

    modifier onlyNotPaused() {
        require(!paused);
        _;
    }

    modifier onlyPaused() {
        require(paused);
        _;
    }

    function pause() onlyOwner onlyNotPaused public {
        paused = true;
        Pause();
    }

    function unpause() onlyOwner onlyPaused public {
        paused = false;
        Unpause();
    }
}//END OF Pausable
