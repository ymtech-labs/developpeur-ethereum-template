const ethers = require("ethers");

/* provider */
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

async function getEthInfos() {
  const signer = await provider.getSigner();
  const blockNumber = await provider.getBlockNumber();
  const dede = {
    blockNumber,
    signer,
  };
  return dede;
}

console.log(getEthInfos());
