import dotenv from "dotenv";
import Web3 from "web3";
dotenv.config();

const rpcURL = `https://ropsten.infura.io/v3/${process.env.PROJECT_ID}`;
const web3 = new Web3(rpcURL);

//Récupération Balance d'une adresse Ethereum
web3.eth.getBalance(
  "0xb8c74A1d2289ec8B13ae421a0660Fd96915022b1",
  (err, wei) => {
    let balance = web3.utils.fromWei(wei, "ether"); // convertir la valeur en ether
    console.log("getBalance : ", balance);
  }
);

//Lecture d'un données d'un smart contact
const ABI = [
  {
    inputs: [{ internalType: "uint256", name: "x", type: "uint256" }],
    name: "set",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "get",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];
const SSaddress = "0xCbd43b4CF42101693689a1f9C201471d8f505E8f";
const simpleStorage = new web3.eth.Contract(ABI, SSaddress);
simpleStorage.methods.get().call((err, data) => {
  console.log("SimpleStorage || get() || data : ", data);
});
