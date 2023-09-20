import React from 'react';
import axios from 'axios';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect} from "react";
import AuthorizationPage from './components/authorization/AuthorizationPage';
import { SignUpPage } from './components/SignUp/pages/SignUpPage';
import Footer from './components/HeaderFooter/footer/Footer';
import Header from './components/HeaderFooter/header/Header';
import PrivacyPolicy from './components/PrivacyPolicyPage/privacy/PrivacyPolicyComponent';
import ScrollToTopButton from './components/PrivacyPolicyPage/privacy/ScrollToTopButton';
import TermsAndConditions from './components/terms-and-conditions-app/terms_conditions/TermsAndConditionsComponent';
import ProfilePage from './components/ProfilePage/ProfilePage';
import MainPage from './components/landing-page/MainPage';
import ProfileView from "./components/ProfileView/ProfileView";
import { AuthContext } from "./context";


function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem("Token")) {
            setIsAuth(true)
        }
        setLoading(false);
    }, [])

    axios.interceptors.request.use(config => {
      const authToken = localStorage.getItem("Token");
      if (authToken) {
        config.headers.Authorization = `Token ${authToken}`;
      }
      return config;
    });

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <BrowserRouter>
        <div className="App">
          <Header isAuthorized={isAuth}> </Header>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/profile/*" element={<ProfilePage />} />
              <Route path="/authorization" element={<AuthorizationPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/profile-view" element={<ProfileView />} />
            </Routes>
            <Footer />
            <ScrollToTopButton />
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
