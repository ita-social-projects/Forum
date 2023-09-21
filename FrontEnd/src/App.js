import './App.css';
import { useState, useEffect } from "react";
import axios from 'axios';
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
import { AuthContext } from "./context/AuthContext";


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const validateToken = async (authToken) => {
    try {
      await axios.get("http://localhost:8000/api/auth/users/me/", {
        headers: {
          'Authorization': `Token ${authToken}`,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  useEffect(() => {
    const authToken = localStorage.getItem("Token")
    if (authToken && validateToken(authToken)) {
          setIsAuth(true)
          axios.interceptors.request.use(config => {
            config.headers.Authorization = `Token ${authToken}`;
          return config;
          });
        }
    setLoading(false);
  }, []);

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
