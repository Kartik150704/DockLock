import React, { useState } from 'react';
import { create } from 'ipfs-http-client';

import Web3 from 'web3';
import data from '../FileStorage.json'
const StorePdf = () => {
  const [ipfsCid, setIpfsCid] = useState('');
  const [fileInput, setFileInput] = useState(null);

  const uploadFileToIPFS = async () => {
    if (!fileInput) {
      alert('Please select a file to upload.');
      return;
    }

    // Initialize IPFS client
    const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });
    

    // Read file and upload to IPFS
    const file = fileInput.files[0];
    const fileContent = await file.arrayBuffer();
    const fileAdded = await ipfs.add({ path: file.name, content: fileContent });

    // Get IPFS CID
    const ipfsCid = fileAdded.cid.toString();
    setIpfsCid(ipfsCid);

    // Connect to Ethereum
    const web3 = new Web3('https://sepolia.infura.io/v3/223458eb1e534a6e9f3ca05bb3658cd3'); // Replace with your Ethereum node URL

    // Replace with your contract ABI and address
    const contractAbi=data.abi; // Replace with your contract's ABI
    const contractAddress = '0x5D9EeF694d8743F9a1d331C8f5E704fb60Bd3323'; // Replace with your contract's address
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    // Set IPFS CID on the Ethereum blockchain
    const accounts = await web3.eth.getAccounts();
    const gasEstimate = await contract.methods.setIpfsCid(ipfsCid).estimateGas();
    await contract.methods.setIpfsCid(ipfsCid).send({
      from: accounts[0],
      gas: gasEstimate,
    });

    alert('File uploaded and IPFS CID recorded on the Ethereum blockchain.');
  };

  return (
    <div>
      <h1>File Upload to IPFS and Ethereum</h1>
      <input type="file" onChange={(e) => setFileInput(e.target)} />
      <button onClick={uploadFileToIPFS}>Upload to IPFS and Ethereum</button>
      {ipfsCid && (
        <div>
          <p>IPFS CID: {ipfsCid}</p>
          <a href={`https://ipfs.io/ipfs/${ipfsCid}`} target="_blank" rel="noopener noreferrer">
            View on IPFS
          </a>
        </div>
      )}
    </div>
  );
};

export default StorePdf;
