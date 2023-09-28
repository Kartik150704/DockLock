import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CommonValueProvider, useCommonValue } from "../ContextAPI/ContextAPI";
import IssueDocument from "./IssueDocument";
import './AdminHomePage.css'
const AdminHome = () => {
    const { getCommonValue, saveCommonValue } = useCommonValue();
    const [userEmail, setUserEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [userType, setUserType] = useState(null)
    const navigate = useNavigate();
    useEffect(() => {
        setUserEmail(getCommonValue("userEmail"))
        setUserName(getCommonValue("userName"))
        setUserType(getCommonValue("userType"))
        let x = localStorage.getItem('userEmail')
        let y = localStorage.getItem('userName')
        let z = localStorage.getItem('userType')
        if (x) {
            setUserEmail(x);
            setUserName(y);
            setUserType(z)
        }
    }, [])

    const LogOut = () => {

        localStorage.setItem('userEmail', '')
        localStorage.setItem('userName', '')
        localStorage.setItem('userType', '')
        saveCommonValue('userEmail', '')
        saveCommonValue('userName', '')
        saveCommonValue('userType', '')
        navigate('/')


    }
    return (
        <div className="admin-container">
           
           <div className="admin-section1">

            <div className="logo">
                <h2>DocLock</h2>
            </div>

            
            <div className="user-info">
                <button className="user-info-button">{userName}</button>
                <button onClick={LogOut} className="admin-logout">Log Out</button>
            </div>
           </div>
            <div className="adminsection2">
            <div className="component-below">
                <IssueDocument />
            </div>

            </div>
            
        </div>
    )
}

export default AdminHome;