import { useLocation } from 'react-router-dom';

import css from './Header.module.css';
import HeaderMenu from './Menu/HeaderMenu';
import Navbar from './Navbar/Navbar';

function Header(props) {
  const location = useLocation();
  const { pathname } = location;
  const hideMenu = pathname === '/login' || pathname === '/sign-up' || pathname.includes('/customadmin');

  return (
    <header>
      <div className={css['header-content']}>
        <Navbar isAuthorized={props.isAuthorized} page={pathname}></Navbar>
        <div className={css['header-divider']}></div>
          {hideMenu ? null : (
            <HeaderMenu />
          )}
        <div className={css['header-divider']}></div>
      </div>
    </header>
  );
}

export default Header;
