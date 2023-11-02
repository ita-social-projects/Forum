import { HashLink } from 'react-router-hash-link';
import { useLocation  } from 'react-router-dom';
import classes from './ProfileDetailNavBar.module.css';

const MENU_LINKS = {
    'about-company': 'Про компанію',
    'startup': 'Стартап',
    'products-services': 'Товари / послуги',
    'logistics': 'Логістика товарів / послуг',
    'cooperation': 'Формат співпраці',
};

function ProfileDetailNavBar() {

  const { hash } = useLocation ();
  console.log('HASH', hash);

  return  (
    <div className={classes['navbar-menu']}>
      {Object.entries(MENU_LINKS).map(([link, label]) => (
        <div key={link} className={classes['navbar-menu__block']}>
          <div className={classes['navbar-menu__item']}>
            <HashLink
              smooth
              to={`#${link}`}
              className={
                `#${link}` === hash
                  ? `${classes['active-link']}`
                  : `${classes['inactive-link']}`
              }
            >
              {label}
            </HashLink>
          </div>
          <div
            className={
              `#${link}` === hash
                ? `${classes['active-devider']}`
                : `${classes['inactive-devider']}`
            }
          />
        </div>
      ))}
    </div>
  );
}

export default ProfileDetailNavBar;
