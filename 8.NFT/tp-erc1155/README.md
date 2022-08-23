# TP - Faire un premier ERC721 personnalisé

## Collection
[The Future of Bloke](https://testnets.opensea.io/collection/bloke-v2) 

## Contracts 

### NFT : 
[ExampleBlokeNFT](https://ipfs.io/ipfs/bafyreidwqlpxz366tqdsgxdastt4erfmbikrtd7nkfj7655ifw5zb57abi/metadata.json) - ipfs://bafyreidwqlpxz366tqdsgxdastt4erfmbikrtd7nkfj7655ifw5zb57abi/metadata.json <br>
[The Perfect Bloke](https://ipfs.io/ipfs/bafyreicdvbwuecxkxahb4bb7nsnfjzf4fpa5jlpbdyl5nfxiov366qectq/metadata.json) - ipfs://bafyreicdvbwuecxkxahb4bb7nsnfjzf4fpa5jlpbdyl5nfxiov366qectq/metadata.json

### Testnet : Rinkeby
[`Bloke`](https://rinkeby.etherscan.io/address/0xe3faa7ef2264b23af541b0a37b79532dfc245368) - 0xe3faa7ef2264b23af541b0a37b79532dfc245368  <br>


## Scripts

### Repository
pnpm build — Compile script to store nft in ipfs <br>
pnpm store:nft — Store NFT in IPFS and Filecoin  

### Hardhat
npx hardhat accounts — Prints the list of accounts<br>
npx hardhat compile — Compiles the entire project, building all and generate documentations<br>
npx hardhat flatten > contracts/flatten/Bloke.sol — Generation of a unified smart contract for verification on Etherscan<br>
npx hardhat node — Starts a JS ON-RP C server on top of Hardhat Network<br>
npx hardhat docgen — Generate documentations of Smart Contract (NatSpec)<br>
npx hardhat check — Run Solhint for static code analysis<br>
npx hardhat test — Runs mocha tests<br>
npx hardhat test --parallel Run tests in parallel<br>
REPORT_GAS=true npx hardhat test — Force report gas for test<br>
npx hardhat coverage — Check the percentage of tests coverage<br>
npx hardhat clean — Clears the cache a nd deletes all artifacts<br>
npx hardhat help — Prints this message<br>
npx hardhat run scripts/deployBloke.ts --network localhost — Deploy deployBloke contract to local network<br>
npx hardhat run scripts/deployBloke.ts --network rinkeby — Deploy deployBloke contract to testnet network<br>
TS_NODE_FILES=true npx ts-node scripts/deploy.ts —