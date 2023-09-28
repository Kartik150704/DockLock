import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import Footer from '../Common/Footer'
const SignUpPage=()=>
{
    const navigate=useNavigate();
    return(
        <div className="login-options">
            <div className="login-section">
                <h2>For Users</h2>
                <p>User can download, verify, and retrieve their documents.</p>
                <button onClick={() => navigate('/user/signup')} className="user-login-btn">
                    Sign Up as User
                </button>
            </div>
            <div className="login-section">
                <h2>For Issuers</h2>
                <p>Issuer can issue documents to the receiver.</p>
                <button onClick={() => navigate('/issuer/signup')} className="issuer-login-btn">
                    Sign Up as Issuer
                </button>
            </div>
            <Footer/>
        </div>
    )
}

export default SignUpPage