import React, { useEffect, useState } from 'react';
import './DocumentationHome.css'
const DocumentationHome = () => {
  const [word, setWord] = useState('');
  const [showSecondaryText, setShowSecondaryText] = useState('');
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const text = "Welcome to DockLock Documentation";
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setWord(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowSecondaryText(true);
          startButtonAnimation(); // Start button animation
        }, 100); // Adjust the delay as needed
      }
    }, 100); // Adjust the interval duration as needed
  }, []);

  const startButtonAnimation = () => {
    const buttons = document.querySelectorAll('.main-body-buttons button');
    let buttonIndex = 0;

    const buttonInterval = setInterval(() => {
      if (buttonIndex < buttons.length) {
        buttons[buttonIndex].classList.add('visible');
        buttonIndex++;
      } else {
        clearInterval(buttonInterval);
        setShowButtons(true);
      }
    }, 100); // Adjust the interval duration as needed
  };

  return (
    <div className="documentation1">
      <h1>{word}</h1>
      
      { <div className={`documentation ${showSecondaryText ? 'visible' : ''}`}>
        <p>This is where you can find information and instructions on using DockLock.</p>
        <header>

        </header>
        <section className="how-docklock-works">
          <h2>What is DockLock?</h2>
          <p>
            DockLock is a cutting-edge document verification platform that provides a secure and efficient way to verify the authenticity of documents using blockchain technology.
          </p>
          <p>
            Our platform ensures the integrity of documents by leveraging blockchain's immutability, making it nearly impossible for documents to be tampered with or counterfeited.
          </p>
          <p>
            DockLock offers a seamless user experience, allowing users to claim and verify documents with ease, all while maintaining the highest level of security through private and public key pairs.
          </p>
        </section>
        <section className="how-docklock-works">
          <h2>How DockLock Works</h2>
          <ol>
            <li className="document-issuance">Document Issuance: An issuer uploads a document to a recipient's Gmail account.</li>
            <li className="email-notification">Email Notification: The recipient receives an email notification informing them about the document's availability.</li>
            <li className="user-login">User Login: The recipient logs in to the DockLock website using their credentials.</li>
            <li className="document-claim">Document Claim: The recipient can claim the document on the platform.</li>
            <li className="blockchain-storage">Blockchain Storage: All document details are securely stored on the blockchain, ensuring immutability and transparency.</li>
            <li className="document-retrieval">Document Retrieval: To retrieve a document, the user must enter the document ID and their private key.</li>
            <li className="document-verification">Document Verification: Others can verify the authenticity of a document provided by a user. They upload the document to the DockLock website and add the public key of the user.</li>
            <li className="verification-result">Verification Result: DockLock then determines whether the document is genuine or fake based on the blockchain records.</li>
          </ol>
        </section>

        <section className="getting-started">
          <h2>Getting Started with DockLock</h2>
          <ol>
            <li className="sign-up">Sign Up: When users sign up on our website, they receive a unique public and private key pair. These keys are essential for document verification and retrieval.</li>
            <li className="claiming-document">Claiming a Document: After receiving an email notification, log in to the DockLock website and claim your document by following the provided instructions.</li>
            <li className="document-verification">Document Verification: To verify a document, upload it to our website and provide the public key associated with the document issuer. DockLock will quickly determine the document's authenticity.</li>
            <li className="retrieving-documents">Retrieving Documents: If you need to retrieve a document, enter the document ID and your private key to access it securely.</li>
          </ol>
        </section>
      </div>}
    </div>
  );
};

export default DocumentationHome;
