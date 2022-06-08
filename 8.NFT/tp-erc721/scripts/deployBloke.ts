import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners(); //get the account to deploy the contract

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Bloke = await ethers.getContractFactory("Bloke");

  //Instance of Voting contract
  const bloke = await Bloke.deploy();

  //waiting of contract deployment
  await bloke.deployed();

  console.log("Bloke deployed to:", bloke.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  }); // Calling the function to deploy the contract
