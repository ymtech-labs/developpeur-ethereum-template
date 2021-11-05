pragma solidity ^0.8.9; 

contract Bank {
    mapping(address => uint) _balances;
    
    modifier notZeroAddress() { // Modifier  //  //Je n'avais pas mis le require    
	    require(msg.sender != address(0), "You cannot deposit for the address zero");
	    _;
    }
    
    function deposit(uint _amount) public notZeroAddress {
        _balances[msg.sender] += _amount; 
    }
    
    function transfer(address _recipient, uint _amount) public notZeroAddress {
        require( _balances[msg.sender] >= _amount, "You dont have money Bro !!!");
        _balances[msg.sender] -= _amount; //J'avais oublié d'enlevé au msg sender;
        _balances[_recipient] += _amount;
    }
    
    function balanceOf(address _address) public view returns(uint) {
        return _balances[_address];
    }
}