
import React from "react";
import { useNavigate } from "react-router-dom";
import Design1 from "./Design1.js";
import './Homepage.css'; 
import Footer from "./Footer.js";
import Navbar from "./Navbar.js";
import MainBody from "./MainBody.js";
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div>
      {/* <Design1 /> */}
      {/* <button onClick={()=>navigate("/login")}>Sign In </button>
      <button onClick={()=>navigate("/signup")}>Sign Up </button> */}
      <Navbar/>
      <MainBody/>
      <Footer/>
    </div>
  );
};

export default HomePage;
