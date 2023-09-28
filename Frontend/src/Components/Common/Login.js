import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css'
import Footer from "./Footer";
const LoginPage = () => {
    const navigate = useNavigate();
    return (
        <div>
        <div className="login-options">
            <div className="login-section">
                <h2>For Users</h2>
                <p>User can download, verify, and retrieve their documents.</p>
                <button onClick={() => navigate('/user/login')} className="user-login-btn">
                    Login as User
                </button>
            </div>
            <div className="login-section">
                <h2>For Issuers</h2>
                <p>Issuer can issue documents to the receiver.</p>
                <button onClick={() => navigate('/issuer/login')} className="issuer-login-btn">
                    Login as Issuer
                </button>
            </div>
        </div>
            <Footer/>

        </div>

    )
}

export default LoginPage