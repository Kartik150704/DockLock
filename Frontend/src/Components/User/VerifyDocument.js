import React, { useState, useEffect } from 'react';
import { pdfToHash } from '../Cryptography/Cryptography';
import { getDocumentDataFromBlockchain } from '../Blockchain/UserFunctions';
import { CommonValueProvider, useCommonValue } from "../ContextAPI/ContextAPI";
import fetchAPI from "../API\'S/FetchAPI";
import './VerifyDocument.css'
const VerifyDocument = () => {

  const { getCommonValue, saveCommonValue } = useCommonValue();
  const [pdfFile, setPdfFile] = useState(null);
  const [publicKey, setPublicKey] = useState('');
  const [issuerName, setIssuerName] = useState('')
  const [eventName, setEventName] = useState('')
  const [documentName, setDocumentName] = useState('');
  const [collectorName, setCollectorName] = useState('');
  const [documentStatus, setDocumentStatus] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [userType, setUserType] = useState(null)

  useEffect(() => {
    setUserEmail(getCommonValue("userEmail"))
    setUserName(getCommonValue("userName"))
    setUserType(getCommonValue("userType"))
    let x = localStorage.getItem('userEmail')
    let y = localStorage.getItem('userName')
    let z = localStorage.getItem('userType')
    if (x) {
      setUserEmail(x);
      setUserName(y);
      setUserType(z)
    }
  }, [])


  const handlePdfFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setPdfFile(selectedFile);
    } else {
      alert('Please select a valid PDF file.');
    }
  };

  const handleTextFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result;
        setPublicKey(fileData);
      };
      reader.readAsText(selectedFile);
    } else {
      alert('Please select a valid text file.');
    }
  };

  const handleVerifyClick = async () => {

    console.log(publicKey)
    let hash = await pdfToHash(pdfFile)
    let documentData = await getDocumentDataFromBlockchain(hash);
    console.log(documentData)
    let stampData = {
      documentHash: hash,
      publicKey: publicKey,
      signature: documentData.signature
    }
    let response = await fetchAPI("https://doclock-backend.onrender.com/verifysignature", stampData, "POST")

    if (response) {
      setDocumentStatus("Document is original and not tempered")
      setCollectorName(documentData.receiver)
      setIssuerName(documentData.issuerName)
      setDocumentName(documentData.documentId)
    }
    else {
      setDocumentStatus("Either the Document is being tempered or not uploaded on blockchain")
      setCollectorName('N/A')
      setIssuerName('N/A')
      setDocumentName('N/A')
    }



  };

  return (
    <div className="verify-form">
      {userEmail && userName && userType === "user" && (
        <div className="form-container">
          <h2 className="form-heading">Verify PDF and Public Key</h2>
          <div className="form-field">
            <label htmlFor="pdfFile" className="form-label">Select PDF File:</label>
            <input
              type="file"
              accept=".pdf"
              id="pdfFile"
              onChange={handlePdfFileChange}
              className="form-input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="textFile" className="form-label">Select Text File (Public Key):</label>
            <input
              type="file"
              accept=".txt"
              id="textFile"
              onChange={handleTextFileChange}
              className="form-input"
            />
          </div>
          <button onClick={handleVerifyClick} className="form-button">Verify</button>
          {pdfFile && <p className="form-message">Selected PDF File: {pdfFile.name}</p>}
          {publicKey && (
            <div className="public-key-section">
            </div>
          )}
          <div className="result-section">
            <h1 className="result-heading">{documentStatus}</h1>
            {documentStatus && <h3 className="result-info">Issued By: {issuerName}</h3>}
            {documentStatus &&<h3 className="result-info">Issued To: {collectorName}</h3>}
            {documentStatus &&<h3 className="result-info">Document Id: {documentName}</h3>}
          </div>
        </div>
      )}
    </div>
  );
};

export default VerifyDocument;
