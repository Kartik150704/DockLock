import React, { useState, useEffect } from "react";
import { AuthenticateWindow } from "../Authentications/GoogleAuthenticate";
import { CommonValueProvider, useCommonValue } from "../ContextAPI/ContextAPI";
import fetchAPI from "../API'S/FetchAPI";
import { useNavigate } from "react-router-dom";
import Footer from "../Common/Footer";
import './UserLogin.css'
const UserLogin = () => {
    const { getCommonValue, saveCommonValue } = useCommonValue();
    const navigate = useNavigate();
    const [userName, setIssuerName] = useState('')
    const [userEmail, setIssuerEmail] = useState('')
    const [isIssuerSignIn, setIsIssuerSignIn] = useState(false)

    const LoginWindow = async () => {
        let response = await AuthenticateWindow();
        if (response) {
            let userData =
            {
                gmail: response.userEmail,
                userName: response.displayName
            }
            response = await fetchAPI("https://doclock-backend.onrender.com/user/login", userData, "POST")
            if (response.login) {
                saveCommonValue("userEmail", userData.gmail)
                saveCommonValue("userName", userData.userName)
                saveCommonValue("userType", "user")
                localStorage.setItem("userEmail", userData.gmail)
                localStorage.setItem("userName", userData.userName)
                localStorage.setItem("userType", "user")
                setIssuerName(userData.userName)
                setIssuerEmail(userData.gmail)
                setIsIssuerSignIn(true);
                navigate('/user/')


            }
            else {
                alert("User is not registered !!")
            }

        }
    }
    return (
        <div>
            <div className="user-login-page">
                <h1>Welcome to Your Document Portal</h1>
                <p>You can verify, issue, and retrieve documents from here.</p>
                {isIssuerSignIn == false && <button className="google-login-btn" onClick={LoginWindow}>
                    <span role="img" aria-label="Google Emoji">🅖</span> Sign in with Google
                </button>}
            </div>
            <Footer/>
            {/*      */}

        </div>
    )
}

export default UserLogin