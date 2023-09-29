import Header from "../HeaderFooter/header/Header";
import { Route, Routes, Navigate } from "react-router-dom";
import MainPage from "../landing-page/MainPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import AuthorizationPage from "../authorization/AuthorizationPage";
import { SignUpPage } from "../SignUp/pages/SignUpPage";
import PrivacyPolicy from "../PrivacyPolicyPage/privacy/PrivacyPolicyComponent";
import TermsAndConditions from "../terms-and-conditions-app/terms_conditions/TermsAndConditionsComponent";
import Footer from "../HeaderFooter/footer/Footer";
import ScrollToTopButton from "../PrivacyPolicyPage/privacy/ScrollToTopButton";
import React from "react";
import CookiesPolicyComponent from "../CookiesPolicyPage/CookiesPolicyComponent";
import { useAuth } from "../../hooks";
import ProfileListPage from "../profileList/ProfileListPage";
import { ConfigProvider } from "antd";

function BasicPage() {
  const auth = useAuth();
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            defaultColor: "#1F9A7C",
            colorPrimaryHover: "#0b6c61",
            fontWeight: 600,
            contentFontSize: 16,
            fontFamilyCode: "Inter",
          },
          Carousel: {
            colorBgContainer: "#40af85",
            dotActiveWidth: 32,
            dotWidth: 32,
            dotHeight: 6,
            lineHeight: 1,
          },
          Radio: {
            colorPrimary: "#1f9a7c",
            borderRadius: 2,
            colorBorder: "#DEE1E8",
            buttonColor: "#25292C",
            fontFamily: "Inter",
            fontSize: 16,
            algorithm: true, // Enable algorithm
          },
          Pagination: {
            colorPrimary: "#1F9A7C",
            colorPrimaryHover: "#0b6c61",
          },
        },
      }}
    >
      <Header isAuthorized={auth.isAuth} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile/*" element={<ProfilePage />} />
        {auth.isAuth ? (
          <Route path="/login" element={<Navigate to="/profile/user-info" />} />
        ) : (
          <Route path="/login" element={<AuthorizationPage />} />
        )}
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route
          path="/profiles/:filter"
          element={<ProfileListPage isAuthorized={auth.isAuth} />}
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/cookies-policy" element={<CookiesPolicyComponent />} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
    </ConfigProvider>
  );
}

export default BasicPage;
