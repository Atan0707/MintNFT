// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract MintNFT {
    uint256 private _tokenIds;

    struct NFT {
        uint256 id;
        string uri;
    }

    mapping(uint256 => NFT) private _nfts;

    constructor() {
        // No initialization required for now
    }

    function mint(string memory uri) public {
        _tokenIds += 1;
        uint256 newNFTId = _tokenIds;
        _nfts[newNFTId] = NFT(newNFTId, uri);
    }

    function getNFT(uint256 id) public view returns (NFT memory) {
        return _nfts[id];
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds;
    }

    function tokenURI(uint256 id) public view returns (string memory) {
        return _nfts[id].uri;
    }
}
