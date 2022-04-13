import Web3 from 'web3';
import dotenv from "dotenv";
dotenv.config();

const provider = `https://ropsten.infura.io/v3/${process.env.INFURA_ID}`
const web3= new Web3(provider);

const ABI = [ { "inputs": [ { "internalType": "uint256", "name": "x", "type": "uint256" } ], "name": "set", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "get", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function", "constant": true } ];

const SSaddress = '0x8cD906ff391b25304E0572b92028bE24eC1eABFb';
const simpleStorage = new web3.eth.Contract(ABI, SSaddress);

simpleStorage.methods.get().call((err, data) => {
   console.log(data);
});