import { useState } from 'react';
import MainBanner from './Banner/Banner';
import MainCompanies from './Companies/Companies';
import MainAboutSection from './AboutSection/About';
import JoinUs from './JoinUs/JoinUs';
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
      <MainBanner isAuthorized={isAuthorized} />
      <MainCompanies isAuthorized={isAuthorized} />
      {!isAuthorized ? <JoinUs /> : null}
      <MainAboutSection />
      <CookieMod
        active={modalActive}
        setActive={setModalActive}
      ></CookieMod>
    </div>
  );
};

export default MainPage;