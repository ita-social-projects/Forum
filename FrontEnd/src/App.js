//For authorization Page
//Don't forget about
//npm install validator
//npm i react-router-dom@6.4.1
//npm install react-cookie
//npm install react-hook-form
import React from 'react';
import { Cookies } from 'react-cookie';
import { useCookies } from 'react-cookie';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './AppMain.css';
import MainPageRectangle from './components/main-page-rectangle/MainPageRectangle';
import { SignUpPage } from './components/SignUp/pages/SignUpPage';
import './AppHeaderFooter.css';
import Footer from './components/HeaderFooter/footer/Footer';
import Header from './components/HeaderFooter/header/Header';
import PrivacyPolicy from './components/PrivacyPolicyPage/privacy/PrivacyPolicyComponent';
import ScrollToTopButton from './components/PrivacyPolicyPage/privacy/ScrollToTopButton';
import TermsAndConditions from './components/terms-and-conditions-app/terms_conditions/TermsAndConditionsComponent';
import MainPage from "./components/landing-page/MainPage";

function App() {
  const [modalActive, setModalActive] = useState(true);
  return (
    <BrowserRouter>
      <div className="App">
        <Header isAuthorized={true}></Header>
        <Routes>
          <Route path="/" element={<MainPage />} />
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
