import { ToastContainer } from 'react-toastify';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { SWRConfig } from 'swr';

import 'react-toastify/dist/ReactToastify.css';
import customTheme from '../pages/CustomThemes/customTheme.js';

import LoginPage from '../pages/Authorization/LoginPage';
import CookiesPolicyComponent from '../pages/CookiesPolicyPage/CookiesPolicyComponent';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Loader from '../components/Loader/Loader';
import MainPage from '../pages/LandingPage/MainPage';
import PrivacyPolicy from '../pages/PrivacyPolicyPage/PrivacyPolicyPage';
import ProfileDetailPage from '../pages/ProfileDetail/ProfileDetailPage';
import ProfileListPage from '../pages/ProfileList/ProfileListPage';
import ProfilePage from '../pages/ProfilePage/ProfilePage';
import { SignUpPage } from '../pages/SignUp/SignUp/SignUpPage';
import { SignUpModalPage } from '../pages/SignUp/SignUp/SignUpModalPage';
import { ResendActivationPage } from '../pages/SignUp/SignUp/ResendActivationPage';
import { ActivationProfilePage } from '../pages/SignUp/SignUp/ActivateProfilePage';
import { SendEmailRestorePasswordPage } from '../pages/RestorePassword/Pages/SendEmailRestorePasswordPage';
import { RestorePasswordPage } from '../pages/RestorePassword/Pages/RestorePasswordPage';
import { RestorePasswordModalPage } from '../pages/RestorePassword/Pages/RestorePasswordModalPage';
import { RestorePasswordSuccessPage } from '../pages/RestorePassword/Pages/RestorePasswordSuccessPage';
import { RestorePasswordFailedPage } from '../pages/RestorePassword/Pages/RestorePasswordFailedPage';
import { ModerationModal } from '../components/Moderation/ModerationModal';
import ScrollToTopButton from '../components/ScrollToTopButton/ScrollToTopButton';
import TermsAndConditions from '../components/TermsAndConditionsApp/terms_conditions/TermsAndConditionsComponent';
import { useAuth } from '../hooks';
import { Search } from '../pages/SearchPage/Search';
import '../pages/CustomThemes/customToastStyles.css';
import Contact from '../components/Contact/Contact';
import ErrorPage404 from '../pages/ErrorPages/ErrorPage404';

function ClientRouter() {
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
          <Route path="/login" element={<LoginPage />} />
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

export default ClientRouter;
