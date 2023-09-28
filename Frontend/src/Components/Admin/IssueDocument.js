import React, { useEffect, useState } from 'react';
import { pdfToHash } from '../Cryptography/Cryptography';
import { uploadFileToStorage } from '../Firebase/AddToStorage';
import fetchAPI from "../API\'S/FetchAPI";
import LoadingScreen from '../Screens/LoadingScreen';
import { CommonValueProvider, useCommonValue } from "../ContextAPI/ContextAPI";
import './IssueDocument.css'

const IssueDocument = () => {

    const { getCommonValue, saveCommonValue } = useCommonValue();
    const [pdfFile, setPdfFile] = useState('');
    const [IssuerName, setIssuerName] = useState('');
    const [IssuerGmail, setIssuerGmail] = useState('kartik150704@gmail.com')
    const [CollectorName, setCollectorName] = useState('');
    const [CollectorGmail, setCollectorGmail] = useState('');
    const [DocId, setDocId] = useState('');
    const [DocumentName, setDocumentName] = useState('');
    const [DocumentHash, setDocumentHash] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    const [EventName, setEventName] = useState('')
    const [showLoadingScreen, setShowLoadingScreen] = useState(false);
    const [userType, setUserType] = useState(null)
    useEffect(() => {
        setIssuerGmail(getCommonValue("userName"))
        setIssuerGmail(getCommonValue("userEmail"))
        setUserType(getCommonValue("userType"))
        let x = localStorage.getItem('userEmail')
        let y = localStorage.getItem('userName')
        let z = localStorage.getItem('userType')
        if (x) {
            setIssuerGmail(x);
            setIssuerName(y);
            setUserType(z)
        }
    }, [])


    function generateUniqueDocumentId() {
        const timestamp = Date.now().toString(); // Get current timestamp as a string
        const randomDigits = Math.floor(Math.random() * 10000000000); // Generate random 10-digit number

        // Combine timestamp and random number, and ensure it's exactly 10 digits long
        const uniqueNumber = (timestamp + randomDigits).slice(0, 10);

        return uniqueNumber;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setShowLoadingScreen(true)

        if (
            pdfFile === '' ||
            IssuerName === '' ||
            CollectorName === '' ||
            CollectorGmail === '' ||
            DocumentName === ''
        ) {
            setErrorMessage('All fields are compulsory');
            return;
        }
        let hash = await pdfToHash(pdfFile)
        setDocumentHash(hash);
        let filename = `${CollectorGmail}_${DocId}.pdf`;
        let ReferenceLink = await uploadFileToStorage(pdfFile, "pdfs", filename)
        console.log(ReferenceLink)
        let uniqueid = generateUniqueDocumentId();
        setDocId(uniqueid)
        let userData = {
            DocId: uniqueid,
            DocumentName: DocumentName,
            IssuerName: IssuerName,
            IssuerGmail: IssuerGmail,
            CollectorName: CollectorName,
            CollectorGmail: CollectorGmail,
            EventName: EventName,
            Status: 'Pending',
            ReferenceLink: ReferenceLink,
            DocumentHash: hash,
        };
        let response = await fetchAPI("http://localhost:8000/issuer/adddocument", userData, "POST")
        setShowLoadingScreen(false);
        console.log(response)
        if (response.dataAdded) {
            alert("Data has been saved successfully ;)")
        }
        else {
            alert("There has been an error in saving the data please try again :(")
        }




    };

    return (
        <div>
            
            {userType === 'admin' && (
                <div className="issuer-container">
                    {showLoadingScreen && <LoadingScreen />}
                    <h2>Document Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="issuer-form-label" htmlFor="pdfFile">
                                PDF File:
                            </label>
                            <input
                                className="issuer-form-input-pdffile"
                                type="file"
                                accept=".pdf"
                                name="pdfFile"
                                id="pdfFile"
                                onChange={(e) => setPdfFile(e.target.files[0])}
                            />
                        </div>
                        <div>
                            <label className="issuer-form-label" htmlFor="IssuerName">
                                Issuer Name:
                            </label>
                            <input
                                className="issuer-form-input"
                                type="text"
                                name="IssuerName"
                                id="IssuerName"
                                onChange={(e) => setIssuerName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="issuer-form-label" htmlFor="CollectorName">
                                Collector Name:
                            </label>
                            <input
                                className="issuer-form-input"
                                type="text"
                                name="CollectorName"
                                id="CollectorName"
                                onChange={(e) => setCollectorName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="issuer-form-label" htmlFor="CollectorGmail">
                                Collector Gmail:
                            </label>
                            <input
                                className="issuer-form-input"
                                type="text"
                                name="CollectorGmail"
                                id="CollectorGmail"
                                onChange={(e) => setCollectorGmail(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="issuer-form-label" htmlFor="DocumentName">
                                Document Name:
                            </label>
                            <input
                                className="issuer-form-input"
                                type="text"
                                name="DocumentName"
                                id="DocumentName"
                                onChange={(e) => setDocumentName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="issuer-form-label" htmlFor="EventName">
                                Event Name:
                            </label>
                            <input
                                className="issuer-form-input"
                                type="text"
                                name="EventName"
                                id="EventName"
                                onChange={(e) => setEventName(e.target.value)}
                            />
                        </div>
                        <div>
                            <button className="issuer-form-button" type="submit">
                                Submit
                            </button>
                        </div>
                        {errorMessage && <div className="issuer-error">{errorMessage}</div>}
                    </form>
                   
                </div>
            )}
        </div>
    );
}

export default IssueDocument;
