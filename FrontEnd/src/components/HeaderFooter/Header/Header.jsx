import css from './Header.module.css';
import HeaderMenu from './Menu/HeaderMenu';
import Navbar from './Navbar/Navbar';

function Header(props) {
  return (
    <header>
      <div className={css['header-content']}>
        <Navbar isAuthorized={props.isAuthorized} page={props.page}></Navbar>
        <div className={css['header-divider']}></div>
        {props.page === 'login' || props.page === 'registration' ? null : (
          <HeaderMenu />
        )}
        <div className={css['header-divider']}></div>
      </div>
    </header>
  );
}

export default Header;
