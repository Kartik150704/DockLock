import React from 'react';
import './InformationScreen.css'; // You can create a CSS file for styling

const InformationScreen = ({ children, onClose }) => {
  return (
    <div className="information-screen-container">
      <div className="information-screen">
        <div className="information-content">
          {children}
        </div>
        <button className="ok-button" onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default InformationScreen;
