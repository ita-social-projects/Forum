import { useState, useEffect, useContext } from 'react';
import { HashLink } from 'react-router-hash-link';
import { useLocation, useNavigate } from 'react-router-dom';

import { PropTypes } from 'prop-types';
import { ActiveLinksContext } from '../../../context/ActiveLinksContext';

import classes from './ProfileDetailNavBar.module.css';


const MENU_LINKS = {
    registeredAndStartup: {
      'about-company': 'Про компанію',
      'startup': 'Стартап',
      'products-services': 'Товари / послуги',
      'logistics': 'Логістика товарів / послуг',
      'cooperation': 'Формат співпраці',
    },
    registered: {
      'about-company': 'Про компанію',
      'products-services': 'Товари / послуги',
      'logistics': 'Логістика товарів / послуг',
      'cooperation': 'Формат співпраці',
    },
    startup: {
      'about-company': 'Про компанію',
      'startup': 'Стартап',
    }
};

function ProfileDetailNavBar({ data }) {
  const { hash } = useLocation ();
  const navigate = useNavigate ();
  const { activeLinks } = useContext(ActiveLinksContext);
  const [activeLink, setActiveLink] = useState('');

  const companyType = () => {
    if (data.is_registered && data.is_startup) {
      return MENU_LINKS.registeredAndStartup;
    } else if (data.is_registered) {
      return MENU_LINKS.registered;
    } else if (data.is_startup) {
      return MENU_LINKS.startup;
    }
  };

  useEffect(() => {
    if (hash) {
      setActiveLink(hash.substring(1));
    } else {
      setActiveLink(
        data.is_registered && activeLinks.includes('about-company') ? 'about-company' :
        data.is_startup && activeLinks.includes('startup') ? 'startup' : ''
      );
    }
  }, [hash, data.is_registered, data.is_startup, activeLinks]);

  useEffect(() => {
    navigate(hash.pathname, {replace: true});
  }, [navigate, hash.pathname]);

  return (
    <div className={classes['navbar-menu__main']}>
      <div className={classes['navbar-menu']}>
        {Object.entries(companyType()).map(
          ([link, label]) =>
            activeLinks.includes(link) && (
              <div key={link} className={classes['navbar-menu__block']}>
                <div className={classes['navbar-menu__item']}>
                  <HashLink
                    smooth
                    to={`#${link}`}
                    className={
                      link === activeLink
                        ? `${classes['active-link']}`
                        : `${classes['inactive-link']}`
                    }
                  >
                    {label}
                  </HashLink>
                </div>
                <div
                  className={
                    link === activeLink ? `${classes['active-devider']}` : null
                  }
                />
              </div>
            )
        )}
      </div>
      <div className={classes['devider']}></div>
    </div>
  );
}

export default ProfileDetailNavBar;

ProfileDetailNavBar.propTypes = {
  data: PropTypes.shape({
    is_registered: PropTypes.bool.isRequired,
    is_startup: PropTypes.bool.isRequired,
  }).isRequired,
};
