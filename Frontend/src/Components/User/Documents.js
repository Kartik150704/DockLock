import React, { useState, useEffect } from "react";
import fetchAPI from "../API'S/FetchAPI";
import { CommonValueProvider, useCommonValue } from "../ContextAPI/ContextAPI";
import { StoreToBlockchain, StoreDataReference } from "../Blockchain/UserFunctions";
import './Documents.css'
const MyDocuments = () => {
  const { getCommonValue, saveCommonValue } = useCommonValue();
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState('');
  const [privateKey, setPrivateKey] = useState("");
  const [userType, setUserType] = useState(null)
  const [documents, setDocuments] = useState([

  ]);
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
      fetchPendingDocuments(x)
    }
  }, [])
  const fetchPendingDocuments = async (email) => {
    if (email) {
      let userData = {
        gmail: email
      }
      let pendingDocuments = await fetchAPI("http://localhost:8000/user/fetchpendingdocument", userData, "POST")
      setDocuments(pendingDocuments)

    }
  }


  const handleClaimDocument = async (documentId) => {
    // Ensure that privateKey is not empty before proceeding
    if (!privateKey) {
      alert("Please upload your private key file first.");
      return;
    }
    // console.log(privateKey)
    let tx = await AddDataToBlockchain(privateKey, documentId)
    console.log(tx)


  };



  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Read the content of the uploaded file (assuming it's a text file)
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileContent = e.target.result;
        setPrivateKey(fileContent);
      };
      reader.readAsText(file);
    }
  };

  const AddDataToBlockchain = async (privateKey, DocId) => {
    let userData = {
      gmail: userEmail,
      DocId: DocId,
      userName:userName
    }
    let response = await fetchAPI("http://localhost:8000/user/claimdocument", userData, "POST");
    let stampData = {
      documentHash: response.DocumentHash,
      privateKey: privateKey
    }

    console.log(response)
    let documentData = await fetchAPI("http://localhost:8000/createstamp", stampData, "POST");

    let signature = documentData.signature
    response.DocId=await (response.DocId).toString()
    let transactionData = {
      DocumentHash: response.DocumentHash,
      signature: signature,
      IssuerGmail: response.IssuerGmail,
      IssuerName: response.IssuerName,
      CollectorName: response.CollectorName,
      DocId:response.DocId

    }
    

    let tx = await StoreToBlockchain(transactionData);
    if (tx) {
      let tx = await StoreDataReference(privateKey, DocId, response.ReferenceLink);
      console.log(tx)
      await fetchAPI("http://localhost:8000/user/updatestatus", userData, "POST");
    }
    return tx;
  };

  return (
    <div className="document-list-container">
      <h2>Document List</h2>
      {MyDocuments.length==0 && <p>All Documents are Collected already</p>}
      <ul className="document-list">
        {documents.map((pendingDocument) => (
          <li key={pendingDocument.DocId} className="document-item">
          <spa>{pendingDocument.DocId}</spa>
            <span>{pendingDocument.DocumentName}</span>
            <button onClick={() => handleClaimDocument(pendingDocument.DocId)} className="claim-btn">
              Claim Document
            </button>
          </li>
        ))}
      </ul>
      <input
        type="file"
        accept=".txt"
        onChange={handleFileUpload}
        // style={{ display: "none" }}
        id="fileInput"
        className="file-input"
      />
      {MyDocuments.length!=0 && <label htmlFor="fileInput" className="upload-label">
        Upload Private Key
      </label>}
      {MyDocuments.length!=0 && <p>These are the Documents , You can claim these to store to blockchain</p>}
    </div>
  );
};

export default MyDocuments;
