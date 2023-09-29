import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CommonValueProvider, useCommonValue } from "../ContextAPI/ContextAPI";
import MyDocuments from "./Documents";
import RetrieveDocument from "./RetrieveDoocument";
import VerifyDocument from "./VerifyDocument";
import IssueDocument from "../Admin/IssueDocument";
import Footer from "../Common/Footer";
import './UserHome.css'
const UserHome = () => {
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

    const [activeTab, setActiveTab] = useState("Documents");
    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
      };
    return (

        <div className="user-section-container">
      <div className="tab-bar">
        <div
          className={`tab ${activeTab === "Documents" ? "active" : ""}`}
          onClick={() => handleTabClick("Documents")}
        >
          Documents
        </div>
        <div
          className={`tab ${activeTab === "Retrieve Documents" ? "active" : ""}`}
          onClick={() => handleTabClick("Retrieve Documents")}
        >
          Retrieve Documents
        </div>
        <div
          className={`tab ${activeTab === "Verify Documents" ? "active" : ""}`}
          onClick={() => handleTabClick("Verify Documents")}
        >
          Verify Documents
        </div>
        <div
          className={`tab ${activeTab === "logout" ? "active" : ""}`}
          onClick={LogOut}
        >
          Log Out
        </div>
      </div>
      <div className="section-content">
        {activeTab === "Documents" && <MyDocuments />}
        {activeTab === "Retrieve Documents" && <RetrieveDocument />}
        {activeTab === "Verify Documents" && <VerifyDocument />}
      </div>
    </div>
      
      
    )
}

export default UserHome;