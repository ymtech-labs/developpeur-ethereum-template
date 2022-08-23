import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Dai = await ethers.getContractFactory("Dai");
  const dai = await Dai.deploy();
  await dai.deployed();
  console.log("Dai deployed to:", dai.address);
  const MyDeFiProject = await ethers.getContractFactory("MyDeFiProject");
  const myDeFiProject = await MyDeFiProject.deploy(dai.address);
  await myDeFiProject.deployed();

  await dai.faucet(myDeFiProject.address, 100);
  await myDeFiProject.foo(deployer, 100);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
