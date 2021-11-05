pragma solidity 0.8.9;

contract Random {
    uint private nonce = 0;
    
    function random() public returns(uint) {
        nonce++;
        return  uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce))) % 100;
    }
}

