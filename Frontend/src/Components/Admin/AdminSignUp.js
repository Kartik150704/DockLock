import React, { useState, useEffect } from "react";
import { AuthenticateWindow } from "../Authentications/GoogleAuthenticate";
import { sendTransactionToMetaMask } from "../Authentications/PayFees";
import LoadingScreen from "../Screens/LoadingScreen";
import { useNavigate } from "react-router-dom";
import fetchAPI from "../API'S/FetchAPI";
import Footer from "../Common/Footer";
const AdminSignUp = () => {
    const navigate = useNavigate()
    const [issuerName, setIssuerName] = useState('')
    const [issuerEmail, setIssuerEmail] = useState('');
    const [isSignedUp, setIsSignedUp] = useState(false);
    const [transaction, setTransaction] = useState(null)
    const [window, setWindow] = useState(false);
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
            response = await fetchAPI("http://localhost:8000/issuer/signup", userData, "POST")
            console.log(response)
            try {

                if (response.signup) {
                    setWindow(true)
                    let tx = await sendTransactionToMetaMask(0.001);
                    setWindow(false)
                    if (tx) {
                        setTransaction("Successful!")
                        userData.check = false
                        response = await fetchAPI("http://localhost:8000/issuer/signup", userData, "POST")
                        if (response.signup) {
                            alert("User has signed up successfully , you can login now")
                            setIsSignedUp(true);
                        }
                        navigate('/issuer/login')
                    }
                    else {
                        setTransaction("Rejected or Failed!")
                    }

                }
                else {
                    alert("User is already present , please login :)");
                    navigate('/issuer/login')
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
                <p>You can upload Documents from here.</p>
                {isSignedUp == false && <button className="google-login-btn" onClick={signup}>
                    <span role="img" aria-label="Google Emoji">🅖</span> Sign Up with Google
                </button>}
            </div>
            <Footer/>

        </div>
    )
}

export default AdminSignUp