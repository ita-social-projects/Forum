import { useState } from 'react';
import MainBanner from './Banner/Banner';
// import MainPartners from './partners/Partners';
import MainCompanies from './Companies/Companies';
import MainLoginBanner from './LoginBanner/LoginBanner';
import MainAboutSection from './AboutSection/About';
import CookieMod from '../../components/CookieAcception/CookieMod';
import css from './MainPage.module.css';
import PropTypes from 'prop-types';

const MainPage = ({ isAuthorized }) => {
  MainPage.propTypes = {
    isAuthorized: PropTypes.bool,
  };
  const [modalActive, setModalActive] = useState(true);
  return (
    <div className={css['main-app']}>
      <div className={css['main-app-header']}>
        <MainBanner isAuthorized={isAuthorized} />
        <div className={css['main-app-body']}>
          <MainCompanies isAuthorized={isAuthorized} />
          {/* <MainPartners /> */}
          {!isAuthorized ? <MainLoginBanner /> : null}
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
  );
};

export default MainPage;
