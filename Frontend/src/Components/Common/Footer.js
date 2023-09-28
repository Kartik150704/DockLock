import React from 'react';
import './Footer.css';
import { useNavigate } from 'react-router-dom';
function Footer() {

  const navigate=useNavigate();
  return (
    <div className='footer-settle'>

      <footer className="footer">
        <div className="footer-content">
          <div>
            <div className="footer-copyright">
              &copy; Kartik Yadav
            </div>

          </div>
          <div>
            <div className='footer-alllinks'>
              <div className="footer-links">
                <a href="https://twitter.com/your_twitter_link" target="_blank" rel="noopener noreferrer">Twitter</a>
                <a href="https://facebook.com/your_facebook_link" target="_blank" rel="noopener noreferrer">Facebook</a>
                <a href="https://linkedin.com/in/your_linkedin_link" target="_blank" rel="noopener noreferrer">LinkedIn</a>

              </div>
              <div className="footer-links">
                <a onClick={()=>navigate('/documentation/')}>Documentation</a>
                <a href="/about">About</a>

              </div>
            </div>

          </div>
        </div>
      </footer>
      <div className='footer-settle-bottom'>

      </div>
    </div>
  );
}

export default Footer;
