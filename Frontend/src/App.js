import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch ,Routes} from 'react-router-dom';
import AdminLogin from './Components/Admin/AdminLogin.js';
import AdminSignUp from './Components/Admin/AdminSignUp.js';
import { CommonValueProvider,useCommonValue } from './Components/ContextAPI/ContextAPI.js';

import IssueDocument from './Components/Admin/IssueDocument.js';
import AdminHome from './Components/Admin/AdminHomePage.js';

import UserLogin from './Components/User/UserLogin.js';
import UserHome from './Components/User/UserHome.js';
import UserSignUp from './Components/User/UserSignUp.js';

import HomePage from './Components/Common/HomePage.js';
import LoginPage from './Components/Common/Login.js';
import SignUpPage from './Components/Common/SignUp.js';

import DocumentationHome from './Components/Documentation/DocumentHome.jsx';
import About from './Components/About/About.js';

import './App.css'

import MyContractABI from './DocumentManagement.json'; 
const contractAddress = '0x979F3b61BdF7eF42bdAfaed42468dAb5C604f1A3'; 
const yourPrivateKey = '0dcec4ef225bc7e6627706325c851919fc184d673d0b344ca79249548f6b9507'; 
MyContractABI = MyContractABI.abi;

function App() {

  return (

    <CommonValueProvider>
        <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignUpPage/>} />
          <Route path="/issuer/" element={<AdminHome/>} />
          <Route path="/issuer/login" element={<AdminLogin/>} />
          <Route path="/issuer/signup" element={<AdminSignUp/>} />
          <Route path="/issuer/upload" element={<IssueDocument/>} />
          <Route path="/user/" element={<UserHome/>} />
          <Route path="/user/login" element={<UserLogin/>} />
          <Route path="/user/signup" element={<UserSignUp/>} />
          <Route path="/documentation/" element={<DocumentationHome/>} />
          <Route path="/about/" element={<About/>} />
          
        </Routes>
      </Router>

    </CommonValueProvider>
  );
}

export default App;
