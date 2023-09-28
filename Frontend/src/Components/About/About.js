import React ,{useState,useEffect} from 'react';
import './About.css'; // Import the CSS file
import '../Documentation/DocumentationHome.css'

const About = () => {
    const [word, setWord] = useState('');
    const [showSecondaryText, setShowSecondaryText] = useState('');
    const [showButtons, setShowButtons] = useState(false);

    useEffect(() => {
        const text = "Welcome to About Section";
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
        }, 90); // Adjust the interval duration as needed
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
        <div className="about-documentation1">
            <h1>{word}</h1>

            {<div className={`documentation ${showSecondaryText ? 'visible' : ''}`}>

                <section className="how-docklock-works-about">
                    <h2>Development sections</h2>
                    <ul>
                        <li className="document-issuance">Front End :N/A</li>
                        <li className="email-notification">Backend : N/A</li>
                        <li className="user-login">Design : N/A</li>
                        <li className="document-claim">Front End and Backend Integration : N/A</li>
                        <li className="blockchain-storage">Smart Contracts and Cryptography : N/A</li>
                    </ul>
                </section>

            </div>}
        </div>
    );
};

export default About;
