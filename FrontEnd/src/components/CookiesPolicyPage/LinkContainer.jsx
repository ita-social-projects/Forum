import { NavLink } from 'react-router-dom';
import styles from './cookiesPolicyComponent.module.css';

const LinkContainer = () => {
  const getClassName = ({ isActive }) =>
    isActive ? styles['link_text__active'] : styles['link_text'];

  return (
    <div className={styles['link']}>
      <NavLink to="/privacy-policy/" className={getClassName}>
        Privacy Policy
      </NavLink>
      <NavLink to="/terms-and-conditions/" className={getClassName}>
        Terms & Conditions
      </NavLink>
      <NavLink to="/cookies-policy/" className={getClassName}>
        Cookie Policy
      </NavLink>
      <NavLink to="/contact/" className={getClassName}>
        Contact
      </NavLink>
    </div>
  );
};

export default LinkContainer;