import { HashLink } from 'react-router-hash-link';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import classes from './ProfileDetailNavBar.module.css';

const MENU_LINKS = {
    'about-company': 'Про компанію',
    'startup': 'Стартап',
    'products-services': 'Товари / послуги',
    'logistics': 'Логістика товарів / послуг',
    'cooperation': 'Формат співпраці',
};

function ProfileDetailNavBar({ data }) {
  const { hash } = useLocation ();
  const navigate = useNavigate ();
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    if (hash) {
      setActiveLink(hash.substring(1));
    } else {
      setActiveLink(
        data.is_registered && document.getElementById('about-company') ? 'about-company' :
        data.is_startup && document.getElementById('startup') ? 'startup' : ''
      );
    }
  }, [hash, data.is_registered, data.is_startup]);

  useEffect(() => {
    navigate(hash.pathname, {replace: true});
  }, [navigate, hash.pathname]);

  return (
    <div>
      <div className={classes['navbar-menu']}>
        {Object.entries(MENU_LINKS).map(
          ([link, label]) =>
            document.getElementById(link) && (
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
