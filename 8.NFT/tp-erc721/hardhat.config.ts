import dotenv from "dotenv";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-waffle";

dotenv.config();
const { PRIVATE_KEY } = process.env;
module.exports = {
  defaultNetwork: "rinkeby",
  networks: {
    hardhat: {},
    rinkeby: {
      url: process.env.RINKEBY_RPC_URL || "",
      accounts:
        process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URL || "",
      accounts: [PRIVATE_KEY],
    },
  },
  solidity: {
    version: "0.8.14",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
