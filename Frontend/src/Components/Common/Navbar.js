import React, { useState } from 'react';
import './Navbar.css';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate=useNavigate()
  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`navbar ${isOpen ? 'open' : ''}`}>
      <div onClick={()=>navigate("/")} className="navbar-logo">
        DockLock
      </div>
      <div className="navbar-links">
        <button className="navbar-button-login" onClick={()=>navigate("/login")}>Login</button>
        <button className="navbar-button-signup" onClick={()=>navigate("/signup")}>Sign Up</button>
      </div>
    </nav>
  );
};

export default Navbar;
