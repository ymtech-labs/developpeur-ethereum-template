/**La pragma n'est pas verrouillé et il manque la license */
pragma solidity ^0.5.12;
 
contract Crowdsale {
   //SafeMath n'est jamais utilisé 
   using SafeMath for uint256;
 
   address public owner; // the owner of the contract
   address public escrow; // wallet to collect raised ETH
   uint256 public savedBalance = 0; // Total amount raised in ETH
   mapping (address => uint256) public balances; // Balances in incoming Ether
 
   // Initialization
   /* Il faut utiliser un constructor */
   function Crowdsale(address _escrow) {
       /** Faille avec le tx.origin */
       owner = tx.origin;
       // add address of the specific contract
       escrow = _escrow;
   }
  
   // function to receive ETH
   /*IL faut utiliser la function receive */
   function() public {
       balances[msg.sender] += msg.value;
       savedBalance += msg.value;
       /*On doit utiliser.call*/
       escrow.send(msg.value);
   }
  
   // refund investisor
   //Possibilité d'une attaque de reeantrance
   function withdrawPayments() public{
       address payee = msg.sender;
       uint256 payment = balances[payee];
       
       /*On doit utiliser.call*/
       payee.send(payment);
 
       savedBalance -= payment;
       balances[payee] = 0;
   }
}
