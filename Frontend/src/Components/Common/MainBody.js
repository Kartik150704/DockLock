import React, { useState, useEffect } from 'react';
import './MainBody.css';
import { useNavigate } from 'react-router-dom';
const MainBody = () => {
  const [word, setWord] = useState('');
  const [showSecondaryText, setShowSecondaryText] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const text = "DockLock";
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
        }, 500); // Adjust the delay as needed
      }
    }, 150); // Adjust the interval duration as needed
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
    }, 150); // Adjust the interval duration as needed
  };
  
  return (
    <div className="letter-animation">
      <h1>{word}</h1>
      <h2 className={`secondary-text ${showSecondaryText ? 'visible' : ''}`}>Let's Get Verified</h2>
      <div className={`main-body-buttons ${showButtons ? 'visible' : ''}`}>
        <button onClick={() => navigate('/documentation/')}>Documentation</button>
        <button onClick={() => navigate('/about/')}>About</button>
        


      </div>
    </div>
  );
};

export default MainBody;
