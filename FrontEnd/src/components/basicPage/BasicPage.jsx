import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import 'react-toastify/dist/ReactToastify.css';

import AuthorizationPage from '../authorization/AuthorizationPage';
import CookiesPolicyComponent from '../CookiesPolicyPage/CookiesPolicyComponent';
import Footer from '../HeaderFooter/footer/Footer';
import Header from '../HeaderFooter/header/Header';
import MainPage from '../landing-page/MainPage';
import PrivacyPolicy from '../PrivacyPolicyPage/privacy/PrivacyPolicyComponent';
import ProfileDetailPage from '../ProfileDetail/ProfileDetailPage';
import ProfileListPage from '../profileList/ProfileListPage';
import ProfilePage from '../ProfilePage/ProfilePage';
import { SignUpPage } from '../SignUp/pages/SignUpPage';
import { SignUpModalPage } from '../SignUp/pages/SignUpModalPage';
import { ResendActivationPage } from '../SignUp/pages/ResendActivationPage';
import { ActivationProfilePage } from '../SignUp/pages/ActivateProfilePage';
import { SendEmailRestorePasswordPage } from '../RestorePassword/pages/SendEmailRestorePasswordPage';
import { RestorePasswordPage } from '../RestorePassword/pages/RestorePasswordPage';
import { RestorePasswordModalPage } from '../RestorePassword/pages/RestorePasswordModalPage';
import { RestorePasswordSuccessPage } from '../RestorePassword/pages/RestorePasswordSuccessPage';
import { RestorePasswordFailedPage } from '../RestorePassword/pages/RestorePasswordFailedPage';
import ScrollToTopButton from '../PrivacyPolicyPage/privacy/ScrollToTopButton';
import TermsAndConditions from '../terms-and-conditions-app/terms_conditions/TermsAndConditionsComponent';
import { useAuth } from '../../hooks';
import { Search } from '../SearchPage/Search';
import './customToastStyles.css';

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
        <Route path="/" element={<MainPage isAuthorized={auth.isAuth} />} />
        <Route path="/profile/*" element={<ProfilePage />} />
        <Route
          path="/profile-detail/:id"
          element={<ProfileDetailPage isAuthorized={auth.isAuth} />}
        />
        <Route
          path="/profiles/:filter"
          element={<ProfileListPage isAuthorized={auth.isAuth} />}
        />
        {auth.isAuth ? (
          <Route path="/login" element={<Navigate to="/profile/user-info" />} />
        ) : (
          <Route path="/login" element={<AuthorizationPage />} />
        )}
        {auth.isAuth ? (
          <Route
            path="/sign-up"
            element={<Navigate to="/profile/user-info" />}
          />
        ) : (
          <Route path="/sign-up" element={<SignUpPage />} />
        )}
        <Route path="/sign-up/modal" element={<SignUpModalPage />} />
        <Route
          path="/sign-up/resend-activation"
          element={<ResendActivationPage />}
        />
        <Route
          path="/activate/:uid/:token"
          element={<ActivationProfilePage />}
        />
        <Route
          path="/reset-password"
          element={<SendEmailRestorePasswordPage />}
        />
        <Route
          path="/reset-password/modal"
          element={<RestorePasswordModalPage />}
        />
        <Route
          path="/password/reset/confirm/:uid/:token"
          element={<RestorePasswordPage />}
        />
        <Route
          path="/reset-password/successfully"
          element={<RestorePasswordSuccessPage />}
        />
        <Route
          path="/reset-password/failed"
          element={<RestorePasswordFailedPage />}
        />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/cookies-policy" element={<CookiesPolicyComponent />} />
        <Route path="/search" element={<Search isAuthorized={auth.isAuth} />} />
      </Routes>
      <Footer />
      <ScrollToTopButton />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        icon={false}
      />
    </ConfigProvider>
  );
}

export default BasicPage;
