// I'm a comment!
// SPDX-License-Identifier: MIT

pragma solidity 0.8.8;

/// @title A simulator for trees
/// @author Larry A. Gardner
/// @notice You can use this contract for only the most basic simulation
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract.
contract SimpleStorage {
  uint256 favoriteNumber;

  struct People {
    uint256 favoriteNumber;
    string name;
  }

  // uint256[] public anArray;
  People[] public people;

  mapping(string => uint256) public nameToFavoriteNumber;

  /// @notice Calculate tree age in years, rounded up, for live trees
  /// @dev The Alexandr N. Tetearing algorithm could increase precision
  /// @param _favoriteNumber The favorite number
  function store(uint256 _favoriteNumber) public {
    favoriteNumber = _favoriteNumber;
  }

  /// @notice Returns the amount of leaves the tree has.
  /// @dev Returns only a fixed number.
  function retrieve() public view returns (uint256) {
    return favoriteNumber;
  }

  function addPerson(string memory _name, uint256 _favoriteNumber) public {
    people.push(People(_favoriteNumber, _name));
    nameToFavoriteNumber[_name] = _favoriteNumber;
  }
}
