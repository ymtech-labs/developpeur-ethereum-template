// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract BlokeNFT is ERC721URIStorage {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  struct Bloke{
    uint height;
    bool hair;
  }

	Bloke[] blokes;

  constructor() ERC721("Bloke", "BYM") {
    
  }

  function MintBloke(address player, string memory tokenURI, uint height, bool hair)
    public
    returns (uint256)
  {
    blokes.push(Bloke(height, hair));
    uint256 newItemId = _tokenIds.current();
    _mint(player, newItemId);
    _setTokenURI(newItemId, tokenURI);
    _tokenIds.increment();
    
    return newItemId;
  }
}
