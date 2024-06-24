import css from './Navbar.module.css';
import Menu from './Menu';
import SearchBox from './SearchBox';
import Profile from './Profile';
import Buttons from './Buttons';
import { Link } from 'react-router-dom';

function Navbar(props) {
  return (
    <div className={css['navbar-content']}>
      <div className={css['navbar-logo__text']}>
        <Link to="/">
            <img
                className={css['main-logo']}
                src={`${process.env.REACT_APP_PUBLIC_URL}/craftMerge-logo.svg`}
                alt="forum-logo"
                width="199"
                height="24"
            ></img>
        </Link>
      </div>
        <div className={css['navbar-utility-bar']}>
            {props.page === 'login' || props.page === 'registration' ? null : (
                <>
                    <Menu/>
                    <SearchBox></SearchBox>
          </>
        )}
        {props.isAuthorized === true ? <Profile /> : <Buttons />}
      </div>
    </div>
  );
}

export default Navbar;
