import { useState } from 'react';
import MainBanner from './banner/Banner';
import MainPartners from './partners/Partners';
import MainCompanies from './companies/Companies';
import MainLoginBanner from './login-banner/LoginBanner';
import MainAboutSection from './about-section/About';
import CookieMod from '../cookieacception/CookieMod';
import css from './MainPage.module.css';

const MainPage = (props) => {
  const [modalActive, setModalActive] = useState(true);
  return (
    <div className="main-app">
      <div className="main-app-header">
        <MainBanner isAuthorized={props.isAuthorized}/>
        <div className={css['main-app-body']}>
          <MainCompanies />
          <MainPartners />
          {!props.isAuthorized ? <MainLoginBanner /> : (null)}
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
