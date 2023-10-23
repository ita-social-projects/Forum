import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import AuthorizationPage from '../authorization/AuthorizationPage';
import CookiesPolicyComponent from '../CookiesPolicyPage/CookiesPolicyComponent';
import Footer from '../HeaderFooter/footer/Footer';
import Header from '../HeaderFooter/header/Header';
import MainPage from '../landing-page/MainPage';
import PrivacyPolicy from '../PrivacyPolicyPage/privacy/PrivacyPolicyComponent';
import ProfileListPage from '../profileList/ProfileListPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import { SignUpPage } from '../SignUp/pages/SignUpPage';
import ScrollToTopButton from '../PrivacyPolicyPage/privacy/ScrollToTopButton';
import TermsAndConditions from '../terms-and-conditions-app/terms_conditions/TermsAndConditionsComponent';
import { useAuth } from '../../hooks';
import { Search } from '../SearchPage/Search';

function BasicPage() {
  const auth = useAuth();
  return (
    <ConfigProvider
      theme={{
        components: {
          Carousel: {
            colorBgContainer: '#40af85',
            dotActiveWidth: 32,
            dotWidth: 32,
            dotHeight: 6,
            lineHeight: 1,
          },
          Button: {
            defaultColor: '#1F9A7C',
            colorPrimaryHover: '#0b6c61',
            fontWeight: 600,
            contentFontSize: 16,
            fontFamilyCode: 'Inter',
          },
          Radio: {
            colorPrimary: '#1f9a7c',
            borderRadius: 2,
            colorBorder: '#DEE1E8',
            buttonColor: '#25292C',
            fontFamily: 'Inter',
            fontSize: 16,
            algorithm: true, // Enable algorithm
          },
          Pagination: {
            colorPrimary: '#1F9A7C',
            colorPrimaryHover: '#0b6c61',
          },
        },
      }}
    >
      <Header isAuthorized={auth.isAuth} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/profile/*" element={<ProfilePage />} />
        <Route
          path="/profiles/:filter"
          element={<ProfileListPage isAuthorized={auth.isAuth} />}
        />
        {auth.isAuth ? (
          <Route path="/login" element={<Navigate to="/profile/user-info" />} />
        ) : (
          <Route path="/login" element={<AuthorizationPage />} />
        )}
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/cookies-policy" element={<CookiesPolicyComponent />} />
        <Route path="/search" element={<Search isAuthorized={auth.isAuth} />} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
    </ConfigProvider>
  );
}

export default BasicPage;
