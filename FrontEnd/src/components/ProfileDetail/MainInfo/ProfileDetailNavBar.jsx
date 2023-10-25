import { HashLink } from 'react-router-hash-link';
import classes from './ProfileDetailNavBar.module.css';

function ProfileDetailNavBar() {
  const menuItems = [
    'Про компанію',
    'Стартап',
    'Товари / послуги',
    'Логістика товарів / послуг',
    'Формат співпраці',
  ];
  const menuLinks = [
    'about-company',
    'startup',
    'products-services',
    'logistics',
    'cooperation',
  ];

  const activeHash = window.location.hash.substring(1);

  const handleItemClick = (link) => {
    window.location.hash = link;
  };

  return (
    <div className={classes['navbar-menu']}>
        {menuItems.map((item, index) => (
        <div key={index} className={classes['navbar-menu__block']}>
          <div
            onClick={() => handleItemClick(menuLinks[index])}
            className={classes['navbar-menu__item']}>
            <HashLink
              smooth
              to={`#${menuLinks[index]}`}
              className={menuLinks[index] === activeHash ? `${classes['active-link']}` : `${classes['inactive-link']}`}
            >
              {item}
            </HashLink>
          </div>
          <div className={menuLinks[index] === activeHash ? `${classes['active-devider']}` : `${classes['inactive-devider']}`}/>
          </div>
        ))}
    </div>
  );
}

export default ProfileDetailNavBar;
