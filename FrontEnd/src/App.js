//For authorization Page
//Don't forget about
//npm install validator
//npm i react-router-dom@6.4.1
//npm install react-cookie
//npm install react-hook-form
//npm install @mui/material @emotion/react @emotion/styled
import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthorizationPage from './components/authorization/AuthorizationPage';
import { SignUpPage } from './components/SignUp/pages/SignUpPage';
import Footer from './components/HeaderFooter/footer/Footer';
import Header from './components/HeaderFooter/header/Header';
import PrivacyPolicy from './components/PrivacyPolicyPage/privacy/PrivacyPolicyComponent';
import ScrollToTopButton from './components/PrivacyPolicyPage/privacy/ScrollToTopButton';
import TermsAndConditions from './components/terms-and-conditions-app/terms_conditions/TermsAndConditionsComponent';
import ProfilePage from './components/ProfilePage/ProfilePage';
import MainPage from './components/landing-page/MainPage';
import AdminPage from "./components/adminPage/AdminPage";
import BasicPage from "./components/basicPage/BasicPage";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/*" element={<BasicPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
