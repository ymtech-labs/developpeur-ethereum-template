//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
contract Dai is ERC20 {
    constructor() ERC20("Dai Stablecoin", "DAI") {}

    // fonction faucet pour créer des Dai tokens
    function faucet(address recipient, uint256 amount) external {
        _mint(recipient, amount);
    }
}
