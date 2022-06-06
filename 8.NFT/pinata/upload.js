import pinataSDK from "@pinata/sdk";
import "dotenv/config";
import fs from "fs";

const API_KEY = process.env.API_KEY;
const API_SECRET = process.env.API_SECRET;
const pinata = pinataSDK(API_KEY, API_SECRET);
const readableStreamForFile = fs.createReadStream("Call.png");

const options = {
  pinataMetadata: {
    name: "CallFunction",
  },
  pinataOptions: {
    cidVersion: 0,
  },
};

pinata
  .pinFileToIPFS(readableStreamForFile, options)
  .then((result) => {
    const body = {
      description: "How to call solidity function",
      image: result.IpfsHash,
      name: "Call",
    };

    pinata
      .pinJSONToIPFS(body, options)
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

/**
   ** RESULT
    {
        IpfsHash: 'QmT5Yjdh1UGMWYnJQ9QRuNWFxKqZA4YB4mA7aHk8hADBiD',
        PinSize: 126,
        Timestamp: '2022-06-06T15:09:32.234Z'
    }
*/
