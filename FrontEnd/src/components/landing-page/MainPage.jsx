import { useState } from 'react';
import MainBanner from './banner/Banner';
import MainPartners from './partners/Partners';
import MainCompanies from './companies/Companies';
import MainLoginBanner from './login-banner/LoginBanner';
import MainAboutSection from './about-section/About';
import CookieMod from '../cookieacception/CookieMod';
import css from './MainPage.module.css';

const MainPage = ({ isAuthorized, userData }) => {
  const [modalActive, setModalActive] = useState(true);
  return (
    <div className={css['main-app']}>
      <div className={css['main-app-header']}>
        <MainBanner isAuthorized={isAuthorized} />
        <div className={css['main-app-body']}>
          <MainCompanies isAuthorized={isAuthorized} userData={userData} />
          <MainPartners />
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
