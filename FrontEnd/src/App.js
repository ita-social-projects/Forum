//For authorization Page
//Don't forget about npm install validator, npm i react-router-dom@6.4.1, npm install react-cookie, npm install react-hook-form
import React from 'react';
import MainPageRectangle from './components/main-page-rectangle/MainPageRectangle';
import { useState } from 'react';
import { Cookies } from 'react-cookie';
import { useCookies } from 'react-cookie';
import './AppMain.css';
import MainMenu from './components/landing-page/menu/Menu';
import MainBanner from './components/landing-page/banner/Banner';
import MainPartners from './components/landing-page/partners/Partners';
import MainCompanies from './components/landing-page/companies/Companies';
import MainLoginBanner from './components/landing-page/login-banner/LoginBanner';
import MainAboutSection from './components/landing-page/about-section/About';
import CookieMod from './components/cookieacception/CookieMod';
import { SignUpPage } from './components/SignUp/pages/SignUpPage';
import './AppHeaderFooter.css';
import Footer from './components/HeaderFooter/footer/Footer';
import Header from './components/HeaderFooter/header/Header';
// import './AppPrivacyPolicy.css';
// import Footer from './components/PrivacyPolicyPage/UI/footer/Footer';
// import Header from './components/PrivacyPolicyPage/UI/header/Header';
import { PrivacyPolicy } from './components/PrivacyPolicyPage/privacy/PrivacyPolicyComponent';
import ScrollToTopButton from './components/PrivacyPolicyPage/privacy/ScrollToTopButton';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TermsAndConditions from './components/terms-and-conditions-app/terms_conditions/TermsAndConditionsComponent';

function App() {
  const [modalActive, setModalActive] = useState(true);
  return (
    <BrowserRouter>
      <div className="App">
        <Header isAuthorized={true}></Header>
        <Routes>
          <Route
            path="/"
            element={
              <div className="main-app">
                <div className="main-app-header">
                  <MainMenu />
                  <MainBanner />
                  <div className="main-app-body">
                    <MainPartners />
                    <MainCompanies />
                    <MainLoginBanner />
                    <MainAboutSection />
                    <div>
                      <CookieMod
                        active={modalActive}
                        setActive={setModalActive}
                      ></CookieMod>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/authorization" element={<MainPageRectangle />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/PrivacyPolicyPage" element={<PrivacyPolicy />} />
          <Route path="/TermsAndConditions" element={<TermsAndConditions />} />
        </Routes>
        <Footer />
        <ScrollToTopButton />
      </div>
    </BrowserRouter>
  );
}

export default App;
