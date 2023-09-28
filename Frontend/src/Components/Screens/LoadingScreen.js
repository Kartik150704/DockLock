import React from 'react';
import './LoadingScreen.css'; // You can create a CSS file for styling

const LoadingScreen = ({ message, children }) => {
  return (
    <div className="loading-screen-container">
      <div className="loading-screen">
        <div className="loader"></div>
        <p className="loading-message">{message}</p>
        {children} 
      </div>
    </div>
  );
};

export default LoadingScreen;
