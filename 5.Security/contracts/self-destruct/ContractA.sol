// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.13;

contract ContractA{
	
	// function to check the balance of this contract
  function getEthBalance() public view returns (uint) {
      return address(this).balance;
  }
}
