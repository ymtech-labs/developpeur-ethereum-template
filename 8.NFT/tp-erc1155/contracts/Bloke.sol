// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/introspection/ERC165.sol";

interface IERC2981Royalties {
    function royaltyInfo(uint256 _tokenId, uint256 _value) external view  returns (address _receiver, uint256 _royaltyAmount);
}

contract Royalties is IERC2981Royalties, ERC165{
    struct RoyaltyInfo {
        address recipient;
        uint24 amount;
    }

    mapping(uint256 => RoyaltyInfo) internal _royalties;

    function supportsInterface(bytes4 interfaceId) public view virtual override returns (bool) {
        return interfaceId == type(IERC2981Royalties).interfaceId || super.supportsInterface(interfaceId);
    }

    function _setTokenRoyalty( uint256 tokenId, address recipient, uint256 value) internal {
        require(value <= 10000, 'ERC2981Royalties: Too high');
        _royalties[tokenId] = RoyaltyInfo(recipient, uint24(value));
    }

    function royaltyInfo(uint256 tokenId, uint256 value) external view override returns (address receiver, uint256 royaltyAmount)
    {
        RoyaltyInfo memory royalties = _royalties[tokenId];
        receiver = royalties.recipient;
        royaltyAmount = (value * royalties.amount) / 10000;
    }
}

contract BlokeNFT is ERC1155URIStorage, Royalties {
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  struct Bloke{
    string name;
    uint height;
    bool hair;
  }

	Bloke[] blokes;

  constructor() ERC1155("https://ipfs.io/votrehash/{id}.json") {
    
  }

      function supportsInterface(bytes4 interfaceId) public view virtual override(ERC1155, Royalties) returns (bool){
        return super.supportsInterface(interfaceId);
    }


  function MintBloke(address player, string memory name, uint height, bool hair, uint number)
    public
    returns (uint256)
  {
    blokes.push(Bloke(name, height, hair));
    uint256 newItemId = _tokenIds.current();
    _mint(player, newItemId, number,"");
    _tokenIds.increment();
    _setTokenRoyalty(newItemId, msg.sender, 1000);
    
    return newItemId;
  }

  function init()public {
      MintBloke(msg.sender, "Parisiens", 170, true, 2*10**6 );
      MintBloke(msg.sender, "F.G", 185, true, 1);
      MintBloke(msg.sender, "Y.M", 180, false, 1);
  }

}
