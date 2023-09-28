import React, { useState, useEffect } from "react";
import { AuthenticateWindow } from "../Authentications/GoogleAuthenticate";
import { CommonValueProvider, useCommonValue } from "../ContextAPI/ContextAPI";
import fetchAPI from "../API'S/FetchAPI";
import { useNavigate } from "react-router-dom";
import Footer from '../Common/Footer'
const AdminLogin = () => {
    const { getCommonValue, saveCommonValue } = useCommonValue();
    const navigate = useNavigate();
    const [userName, setuserName] = useState('')
    const [userEmail, setuserEmail] = useState('')
    const [isuserSignIn, setIsuserSignIn] = useState(false)
    const LoginWindow = async () => {
        let response = await AuthenticateWindow();
        if (response) {
            let userData =
            {
                gmail: response.userEmail,
                userName: response.displayName
            }
            response = await fetchAPI("http://localhost:8000/user/login", userData, "POST")
            if (response.login) {
                saveCommonValue("userEmail", userData.gmail)
                saveCommonValue("userName", userData.userName)
                saveCommonValue("userType", "admin")
                localStorage.setItem("userEmail", userData.gmail)
                localStorage.setItem("userName", userData.userName)
                localStorage.setItem("userType", "admin")
                setuserName(userData.userName)
                setuserEmail(userData.gmail)
                setIsuserSignIn(true);
                navigate('/issuer/')



            }
            else {
                alert("User is not registered !!")
            }

        }
    }
    return (
        // <div>
        //     {isuserSignIn==false && <button onClick={LoginWindow}>Issuer Login</button>}
        //     <h1>{userName}</h1>
        //     <h1>{userEmail}</h1>
        // </div>
        <div>
            <div className="user-login-page">
                <h1>Welcome to Your Document Portal</h1>
                <p>You can upload Documents from here.</p>
                {isuserSignIn == false && <button className="google-login-btn" onClick={LoginWindow}>
                    <span role="img" aria-label="Google Emoji">🅖</span> Sign in with Google
                </button>}
            </div>
            {/*      */}
            <Footer/>

        </div>
    )
}

export default AdminLogin