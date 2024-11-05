import { useLocation } from 'react-router-dom';

import Navbar from './Navbar/Navbar';

import css from './Header.module.css';

function Header(props) {
  const { pathname } = useLocation();

  return (
    <header>
      <div className={css['header-content']}>
        <Navbar isAuthorized={props.isAuthorized} page={pathname}></Navbar>
        <div className={css['header-divider']}></div>
      </div>
    </header>
  );
}

export default Header;
