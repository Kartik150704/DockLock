import React, { useState, useEffect } from 'react';
import { pdfToHash } from '../Cryptography/Cryptography';
import MyContractABI from '../../FileStorage.json';
import Web3 from "web3"
import './Test.css'
const contractAddress = "0x755D7Bb49f805cAC75Fc50207C1F82f889Dbd9b2";
const privateKeyBlockchain = "0dcec4ef225bc7e6627706325c851919fc184d673d0b344ca79249548f6b9507";
MyContractABI = MyContractABI.abi




function PdfUpload() {
  const [pdfFile, setPdfFile] = useState(null);
  const [privateKey, setPrivateKey] = useState('');
  const [documentHash, setdocumentHash] = useState('')
  const [publicKey, setpublicKey] = useState('')
  const [signature, setsignature] = useState('')
  const [verified, setverified] = useState(null);
  const [contract, setContract] = useState('')
  const [tx, settx] = useState('')
  const [web3, setWeb3] = useState(null);
  const [mode, setMode] = useState('upload');

  useEffect(() => {
    async function initialize() {


      const web3WithPrivateKey = new Web3(new Web3.providers.HttpProvider(`https://sepolia.infura.io/v3/223458eb1e534a6e9f3ca05bb3658cd3`));
      const yourAccount = web3WithPrivateKey.eth.accounts.privateKeyToAccount(privateKeyBlockchain);
      web3WithPrivateKey.eth.accounts.wallet.add(yourAccount);


      const contractWithPrivateKey = new web3WithPrivateKey.eth.Contract(MyContractABI, contractAddress);
      setContract(contractWithPrivateKey)








    }

    initialize();
  }, []);


  const handlePdfFileChange = async (e) => {
    const file = e.target.files[0];
    setPdfFile(file);
    let v = await pdfToHash(file)
    setdocumentHash(v);
  };

  const handlePrivateKeyChange = (e) => {
    const file = e.target.files[0];
    if (!file) return; 

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      setPrivateKey(content);
      console.log(content)
    };



    reader.readAsText(file);
  };

  const handlePublicKeyChange = (e) => {
    const key = e.target.value;
    setpublicKey(key);
  };

  const handleModeChange = (newMode) => {
    // Add a simple fade animation when switching modes
    setpublicKey('')

    setMode(newMode)
  };



  const handleDownload = (inputdata) => {
    const blob = new Blob([inputdata], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `Public_key_for_${pdfFile.name}.txt`; // Set the desired file name
    a.style.display = 'none';
    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePublicKeyFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return; // No file selected or user canceled

    const reader = new FileReader();

    reader.onload = (e) => {
      const content = e.target.result;
      setpublicKey(content);
      console.log(content)
    };



    reader.readAsText(file);
  };
  const UploadData = async () => {


    let data = {
      documentHash: documentHash,
      privateKey: privateKey

    }

    let requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };


    fetch('http://localhost:8000/createstamp', requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData.signature);


        setsignature(responseData.signature);




        const tx = contract.methods.uploadData(documentHash, responseData.signature).send({
          from: "0xB98B044A44F7Ffd5408266B7164638D1E7BfA12A",
          gas: 2000000
        }).then((tx) => {
          console.log(documentHash);
          console.log(signature)
          console.log(tx.blockHash);
          settx("data has been successfully uploaded "+tx.blockHash);

        });



      })
      .catch((error) => {
        console.error('Error:', error);
      });








  }

  const verifyData = async () => {

    console.log(publicKey)
    let tx = await contract.methods.verifyData(documentHash).call();

    let data = {
      documentHash: documentHash,
      publicKey: publicKey,
      signature: tx

    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    let response = await fetch('http://localhost:8000/verifysignature', requestOptions);
    response = await response.json();
    console.log(response)
    if (response) {
      setverified("Document is Correct");

    }
    else {
      setverified("Document is incorrect")
    }
  }

  return (
    <div className="pdf-upload-container" id="pdf-upload-container">
      <h1>Data Upload and Validation</h1>
      <div>
        <label>Upload PDF File: </label>
        <input type="file" accept=".pdf" onChange={handlePdfFileChange} />
      </div>
      <div>
        {mode == "upload" &&
          <div>
            <label>Upload Private Key File: </label>
            <input type="file" accept=".txt" onChange={handlePrivateKeyChange} />

          </div>

        }
        {mode == "verify" &&
          <div>
            <label>Upload Public Key File: </label>
            <input type="file" accept=".txt" onChange={handlePublicKeyFileChange} />
          </div>

        }
      </div>
      <div>
        <p>PDF File: {pdfFile ? pdfFile.name : 'No file selected'}</p>
        {mode === 'upload' && (
          <>
            <button onClick={() => handleModeChange('verify')}>Switch to Verify</button>

          </>
        )}
        {mode === 'verify' && (
          <>
            <button onClick={() => handleModeChange('upload')}>Switch to Upload</button>

          </>
        )}
        
        <h3>{tx}</h3>
        <h3>{}</h3>
        {/* <h3>{verified}</h3> */}
        {mode == "upload" && <button onClick={UploadData}>Upload Document</button>}
        {mode == "verify" && <button onClick={verifyData}>Verify Document</button>}
        {mode == "verify" && verified != null && <h1>{verified}</h1>}
      </div>
    </div>
  );
}

export default PdfUpload;
