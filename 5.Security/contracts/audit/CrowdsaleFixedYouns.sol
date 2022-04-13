// SPDX-License-Identifier: GPL-3.0 
/*Ajout de la licenses & vérrouillage du pragma */
pragma solidity 0.8.13; 
 
contract Crowdsale {

   /*Suppression de la library SafeMath  */ 
 
   address public owner; // the owner of the contract
   address public escrow; // wallet to collect raised ETH
   uint256 public savedBalance = 0; // Total amount raised in ETH
   mapping (address => uint256) public balances; // Balances in incoming Ether
 
   // Initialization
   /* Modification en constructor */
   constructor (address _escrow) {
       /* Remplacement tx.origin par msg.sender */
       owner = msg.sender; 
       // add address of the specific contract
       escrow = _escrow;
   }
  
   // function to receive ETH
   receive() payable external {
       balances[msg.sender] += msg.value;
       savedBalance += msg.value;
       /*Utilisation .call*/
       escrow.call{value:msg.value};
   }
  
   // refund investisor
   function withdrawPayments() public{
       address payee = msg.sender;
       uint256 payment = balances[payee];

       /*Utilisation .call et réinitilisation de la balance pour éviter réentrance */
       balances[payee] = 0;
       payee.call{value:payment};

       savedBalance -= payment;
       
   }
}
