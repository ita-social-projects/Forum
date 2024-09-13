import { Route, Routes, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { SWRConfig } from 'swr';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './customToastStyles.css';
import customTheme from './customTheme.js';

import AuthorizationPage from '../authorization/AuthorizationPage';
import CookiesPolicyComponent from '../CookiesPolicyPage/CookiesPolicyComponent';
import Footer from '../HeaderFooter/footer/Footer';
import Header from '../HeaderFooter/header/Header';
import Loader from '../loader/Loader';
import MainPage from '../landing-page/MainPage';
import PrivacyPolicy from '../PrivacyPolicyPage/PrivacyPolicyPage';
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
import { ModerationModal } from '../moderation/ModerationModal';
import ScrollToTopButton from '../ScrollToTopButton/ScrollToTopButton';
import TermsAndConditions from '../terms-and-conditions-app/terms_conditions/TermsAndConditionsComponent';
import { useAuth } from '../../hooks';
import { Search } from '../SearchPage/Search';
import Contact from '../Contact/Contact';
import ErrorPage404 from '../errorPages/ErrorPage404';

function BasicPage() {
  const { isAuth, user, logout, isLoading } = useAuth();

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
