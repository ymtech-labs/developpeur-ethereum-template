import { NFTStorage, File } from "nft.storage";
import * as fs from "fs";
import * as dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.NFT_STORAGE_API_KEY
  ? process.env.NFT_STORAGE_API_KEY
  : "";

async function storeAsset() {
  const client = new NFTStorage({ token: API_KEY });
  const metadata = await client.store({
    name: "The Perfect Bloke",
    description:
      "The most elaborate man of the collection, to buy only in case of love at first sight, thank you",
    image: new File(
      [await fs.promises.readFile("assets/bloke.png")],
      "bloke.png",
      { type: "image/png" }
    ),
  });
  console.log("Metadata stored on Filecoin and IPFS with URL:", metadata.url);
}

storeAsset()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

//Metadata stored on Filecoin and IPFS with URL: ipfs://bafyreidwqlpxz366tqdsgxdastt4erfmbikrtd7nkfj7655ifw5zb57abi/metadata.json
