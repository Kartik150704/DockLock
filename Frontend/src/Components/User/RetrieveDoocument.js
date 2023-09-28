import React, { useState, useEffect } from 'react';
import { GetDataReference } from '../Blockchain/UserFunctions';
import { CommonValueProvider, useCommonValue } from "../ContextAPI/ContextAPI";

import './RetrieveDocument.css'
const RetrieveDocument = () => {

  const { getCommonValue, saveCommonValue } = useCommonValue();
  const [userEmail, setUserEmail] = useState('')
  const [userName, setUserName] = useState('')
  const [userType, setUserType] = useState(null)
  const [DocId, setDocId] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [file, setFile] = useState(null);
  const [referenceLink, setReferenceLink] = useState('')

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
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileData = reader.result;
        setPrivateKey(fileData);
      };
      reader.readAsText(selectedFile);
      setFile(selectedFile);
    }
  };

  const getReferenceLink = async () => {
    let link = await GetDataReference(privateKey, parseInt(DocId));
    window.open(link, '_blank');
    console.log("Link", link)
    setReferenceLink(link);
  };

  return (
    <div className="user-form">
      {userEmail && userName && userType === "user" && (
        <div className="form-container">
          <h2 className="form-heading">Enter DocId and Select Text File</h2>
          <div className="form-field">
            <label htmlFor="docId" className="form-label">DocId:</label>
            <input
              type="text"
              id="docId"
              value={DocId}
              onChange={(e) => setDocId(e.target.value)}
              className="retrieve-form-input"
            />
          </div>
          <div className="form-field">
            <label htmlFor="fileInput" className="form-label">Select Text File:</label>
            <input
              type="file"
              accept=".txt"
              id="fileInput"
              onChange={handleFileChange}
              className="retrieve-form-input-file"
            />
          </div>
          <button onClick={getReferenceLink} className="form-button">Process File</button>
          {file && (
            <div className="selected-file">
              <h3 className="selected-file-heading">Selected Text File:</h3>
              <p className="selected-file-name">File Name: {file.name}</p>
            </div>
          )}
          <p className="reference-link">{referenceLink}</p>
        </div>
      )}
    </div>
  );
};

export default RetrieveDocument;
