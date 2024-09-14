import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { SWRConfig } from 'swr';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './customToastStyles.css';
import customTheme from './customTheme.js';

import AuthorizationPage from '../components/Authorization/AuthorizationPage';
import CookiesPolicyComponent from '../pages/CookiesPolicyPage/CookiesPolicyComponent';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Loader from '../components/Loader/Loader';
import MainPage from '../pages/LandingPage/MainPage';
import PrivacyPolicy from '../pages/PrivacyPolicyPage/PrivacyPolicyPage';
import ProfileDetailPage from '../pages/ProfileDetail/ProfileDetailPage';
import ProfileListPage from '../pages/ProfileList/ProfileListPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import { SignUpPage } from '../pages/BasicPage/SignUp/SignUpPage';
import { SignUpModalPage } from '../pages/BasicPage/SignUp/SignUpModalPage';
import { ResendActivationPage } from '../pages/BasicPage/SignUp/ResendActivationPage';
import { ActivationProfilePage } from '../pages/BasicPage/SignUp/ActivateProfilePage';
import { SendEmailRestorePasswordPage } from '../components/RestorePassword/Pages/SendEmailRestorePasswordPage';
import { RestorePasswordPage } from '../components/RestorePassword/Pages/RestorePasswordPage';
import { RestorePasswordModalPage } from '../components/RestorePassword/Pages/RestorePasswordModalPage';
import { RestorePasswordSuccessPage } from '../components/RestorePassword/Pages/RestorePasswordSuccessPage';
import { RestorePasswordFailedPage } from '../components/RestorePassword/Pages/RestorePasswordFailedPage';
import { ModerationModal } from '../components/Moderation/ModerationModal';
import ScrollToTopButton from '../components/ScrollToTopButton/ScrollToTopButton';
import TermsAndConditions from '../components/TermsAndConditionsApp/terms_conditions/TermsAndConditionsComponent';
import { useAuth } from '../hooks';
import { Search } from '../pages/SearchPage/Search';
import '../pages/BasicPage/customToastStyles.css';
import Contact from '../components/Contact/Contact';
import ErrorPage404 from '../pages/ErrorPages/ErrorPage404';

function ClientRouter() {
  const { isAuth, user, logout, isLoading } = useAuth();

  const customTheme = {
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
      Select: {
        colorPrimary: '#1f9a7c',
        borderRadiusSM: '2px',
        optionPadding: '5px 12px',
        optionFontSize: 14,
        optionLineHeight: '22px',
        optionSelectedBg: '#EFFFF6',
        optionSelectedColor: '#25292C',
        multipleItemBorderColor: '#D9D9D9',
        multipleItemBg: '#F8F8F8',
      },
      Checkbox: {
        colorPrimary: '#1f9a7c',
        colorPrimaryHover: '#1f9a7c',
      }
    },
  };

  return (
    <ConfigProvider
      theme={customTheme}
    >
      <SWRConfig value={{
        onError: (error) => {
          console.error(error);
          if (error.status === 401) {
            logout();
          }
        }
      }}>
      <Header isAuthorized={isAuth} />
      {isLoading ? <Loader /> :
      (<Routes>
        <Route path="/" element={<MainPage isAuthorized={isAuth} />} />
        {isAuth ? (
          <Route path="/profile/*" element={<ProfilePage />} />
          ) : (
          <Route path="/profile/*" element={<Navigate to="/" />} />
          )}
        <Route
          path="/profile-detail/:id"
          element={<ProfileDetailPage isAuthorized={isAuth} />}
        />
        <Route
          path="/profiles/:filter"
          element={<ProfileListPage isAuthorized={isAuth} />}
        />
        {isAuth ? (
          <Route path="/login" element={<Navigate to="/profile/user-info" />} />
        ) : (
          <Route path="/login" element={<AuthorizationPage />} />
        )}
        {isAuth ? (
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
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/search"
          element={<Search isAuthorized={isAuth} userData={user} />}
        />
        <Route path="/moderation/:id/:action" element={<ModerationModal />}
        />
        <Route path="*" element={< ErrorPage404 />} />
      </Routes>)}
      <Footer />
      <ScrollToTopButton />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="colored"
        icon={false}
      />
      </SWRConfig>
    </ConfigProvider>
  );
}

export default BasicPage;
