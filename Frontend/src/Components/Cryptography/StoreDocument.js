import React, { useState } from 'react';
import { SHA256 } from 'crypto-js';
import forge from 'node-forge';

const DocumentSigningApp = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [signature, setSignature] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPdfFile(file);
    }
  };

  const handlePrivateKeyChange = (event) => {
    setPrivateKey(event.target.value);
  };

  const hashPdfAndSign = () => {
    if (pdfFile && privateKey) {
      const reader = new FileReader();

      reader.onload = async () => {
        try {
          // Convert the binary data of the PDF file to a WordArray
          const pdfBinaryData = new Uint8Array(reader.result);
          const pdfWordArray = SHA256(pdfBinaryData);

          // Convert the WordArray to a hex string (document hash)
          const documentHash = pdfWordArray.toString();
          

          // Create a private key object from the provided private key
          const rsaPrivateKey = forge.pki.privateKeyFromPem(privateKey);
          

          // Sign the document hash using the private key
          const md = forge.md.sha256.create();
          md.update(documentHash, 'utf8');
          const signature = rsaPrivateKey.sign(md);
          

          // Generate the corresponding public key
          const rsaPublicKey = rsaPrivateKey.toPublicPem();

          setPublicKey(rsaPublicKey);
          setSignature(signature);
        } catch (error) {
          console.error('Error:', error);
        }
      };

      reader.readAsArrayBuffer(pdfFile);
    }
  };

  return (
    <div>
      <h1>Sign a PDF File</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <textarea
        placeholder="Enter your private key (PEM format) here"
        value={privateKey}
        onChange={handlePrivateKeyChange}
      />
      <button onClick={hashPdfAndSign}>Hash PDF and Sign</button>
      {publicKey && <div><h3>Public Key:</h3><textarea readOnly={true} value={publicKey} /></div>}
      {signature && <div><h3>Signature:</h3><textarea readOnly={true} value={signature} /></div>}
    </div>
  );
};

export default DocumentSigningApp;
