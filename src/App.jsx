import React, { useState } from "react";
import { ethers } from "ethers";

// Address of deployed contract
const contractAddress = "YOUR_CONTRACT_ADDRESS";

// ABI (Application Binary Interface) of the contract
const contractABI = [
  {
    "inputs": [{ "internalType": "string", "name": "uri", "type": "string" }],
    "name": "mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }],
    "name": "getNFT",
    "outputs": [
      {
        "components": [
          { "internalType": "uint256", "name": "id", "type": "uint256" },
          { "internalType": "string", "name": "uri", "type": "string" }
        ],
        "internalType": "struct MintNFT.NFT",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "id", "type": "uint256" }],
    "name": "tokenURI",
    "outputs": [{ "internalType": "string", "name": "", "type": "string" }],
    "stateMutability": "view",
    "type": "function"
  }
];

const MintNFT = () => {
  const [account, setAccount] = useState(null);
  const [uri, setUri] = useState("");
  const [isMinting, setIsMinting] = useState(false);

  // Function to connect to Metamask
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const [selectedAccount] = await window.ethereum.request({ method: "eth_requestAccounts" });
        setAccount(selectedAccount);
      } catch (error) {
        console.error("Error connecting to Metamask", error);
      }
    } else {
      alert("Please install Metamask!");
    }
  };

  // Function to mint NFT
  const mintNFT = async () => {
    if (!account || !uri) return;
    setIsMinting(true);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      const tx = await
