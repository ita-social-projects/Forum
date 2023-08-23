import { useState } from 'react';
import MainMenu from './menu/Menu';
import MainBanner from './banner/Banner';
import MainPartners from './partners/Partners';
import MainCompanies from './companies/Companies';
import MainLoginBanner from './login-banner/LoginBanner';
import MainAboutSection from './about-section/About';
import CookieMod from '../cookieacception/CookieMod';
import css from './MainPage.module.css';

const MainPage = () => {
  const [modalActive, setModalActive] = useState(true);
  return (
    <div className={css["main-app"]}>
      <div>
        <MainMenu />
        <MainBanner />
        <div className={css["main-app-body"]}>
          <MainPartners />
          <MainCompanies />
          <MainLoginBanner />
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
