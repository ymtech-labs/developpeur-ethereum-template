// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.13;

contract Store {

    mapping(address => uint) public balances;

    event noCompliantDeposit(address _from);
    event compliantDeposits(address _from, uint _value);


    function deposit() payable external {
        balances[msg.sender] += msg.value;
        emit compliantDeposits(msg.sender, msg.value);
    }

    fallback() external { 
        emit noCompliantDeposit(msg.sender);
    }

    receive() external payable { 
        emit compliantDeposits(msg.sender, msg.value);
    }

    
}