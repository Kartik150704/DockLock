import React, { useState, useEffect } from "react";
import { AuthenticateWindow } from "../Authentications/GoogleAuthenticate";
import { sendTransactionToMetaMask } from "../Authentications/PayFees";
import LoadingScreen from "../Screens/LoadingScreen";
import { useNavigate } from "react-router-dom";
import fetchAPI from "../API'S/FetchAPI";
import Footer from "../Common/Footer";
import KeyGenerator from "../Cryptography/GenerateKeys";
const UserSignUp = () => {
    const [issuerName, setIssuerName] = useState('')
    const [issuerEmail, setIssuerEmail] = useState('');
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [transaction, setTransaction] = useState(null)
    const [window, setWindow] = useState(false);
    const navigate = useNavigate();
    const LoadingWindow = () => {
        return (
            <LoadingScreen>
                <h2>Waiting for Transaction.....</h2>
            </LoadingScreen>
        )
    }
    const signup = async () => {
        let response = await AuthenticateWindow();
        console.log(response);
        let flag = false;
        if (response) {
            flag = true
        }
        if (flag == true) {

            let userData = {
                gmail: response.userEmail,
                userName: response.displayName,
                check: true
            }
            response = await fetchAPI("http://localhost:8000/user/signup", userData, "POST")
            console.log(response)
            try {

                if (response.signup) {


                    setTransaction("Successful!")
                    userData.check = false
                    response = await fetchAPI("http://localhost:8000/user/signup", userData, "POST")
                    if (response.signup) {
                        alert("User has signed up successfully , Now You can login")
                        setIsSignedUp(true);
                    }





                }
                else {
                    alert("User is already present , please login :)");
                    navigate('/user/login')
                }
            }
            catch
            {

            }
        }
    }

    return (
        <div>
            {window == true && <LoadingWindow />}
            <div className="user-login-page">
                <h1>Welcome to Your Document Portal</h1>
                <p>You can verify, issue, and retrieve documents from here.</p>
                {isSignedUp == false && <button className="google-login-btn" onClick={signup}>
                    <span role="img" aria-label="Google Emoji">🅖</span> Sign Up with Google
                </button>}
                {isSignedUp && <div>
                    <KeyGenerator/>
                </div>}
            </div>
            <Footer />

        </div>
    )
}

export default UserSignUp