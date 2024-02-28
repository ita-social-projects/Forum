import { NavLink } from 'react-router-dom';
import styles from './cookiesPolicyComponent.module.css';

const LinkContainer = () => (
  <div className={styles['link']}>
          <NavLink
            to="/privacy-policy/"
            className={({ isActive }) =>
              isActive ? styles['link_text__active'] : styles['link_text']
            }
          >
            Privacy Policy<br />
          </NavLink>
          <NavLink
            to="/terms-and-conditions/"
            className={({ isActive }) =>
              isActive ? styles['link_text__active'] : styles['link_text']
            }
          >
            Terms & Conditions<br />
          </NavLink>
          <NavLink
            to="/cookies-policy/"
            className={({ isActive }) =>
              isActive ? styles['link_text__active'] : styles['link_text']
            }
          >
            Cookie Policy
          </NavLink>
          <NavLink
            to="/contact/"
            className={({ isActive }) =>
              isActive ? styles['link_text__active'] : styles['link_text']
            }
          >
            Contact
          </NavLink>
        </div>
);

export default LinkContainer;

