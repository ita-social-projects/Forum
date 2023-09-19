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
import ProfileView from "./components/ProfileView/ProfileView";


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header isAuthorized={true}></Header>
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
  );
}

export default App;
