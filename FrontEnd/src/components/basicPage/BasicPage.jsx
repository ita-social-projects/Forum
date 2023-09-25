import Header from "../HeaderFooter/header/Header";
import {Route, Routes, Navigate} from "react-router-dom";
import MainPage from "../landing-page/MainPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import AuthorizationPage from "../authorization/AuthorizationPage";
import {SignUpPage} from "../SignUp/pages/SignUpPage";
import PrivacyPolicy from "../PrivacyPolicyPage/privacy/PrivacyPolicyComponent";
import TermsAndConditions from "../terms-and-conditions-app/terms_conditions/TermsAndConditionsComponent";
import Footer from "../HeaderFooter/footer/Footer";
import ScrollToTopButton from "../PrivacyPolicyPage/privacy/ScrollToTopButton";
import React from "react";
import CookiesPolicyComponent from "../CookiesPolicyPage/CookiesPolicyComponent";
import { AuthContext } from "../../context";
import { useProvideAuth } from "../../hooks";


function BasicPage() {
    const auth = useProvideAuth();
    return (
        <AuthContext.Provider value={auth}>
            <div>
                <Header isAuthorized={ auth.isAuth }/>
                <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/profile/*" element={<ProfilePage />} />
                    { auth.isAuth ? (
                    <Route path="/authorization" element={<Navigate to="/profile/user-info" />} />
                    ) : (
                    <Route path="/authorization" element={<AuthorizationPage />} />
                    )}
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                    <Route path="/cookies-policy" element={<CookiesPolicyComponent />} />
                </Routes>
                <Footer />
                <ScrollToTopButton />
            </div>
        </AuthContext.Provider>
    );
};

export default BasicPage;
