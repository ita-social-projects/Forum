import css from './Navbar.module.css';
import Menu from './Menu';
import SearchBox from './SearchBox';
import Profile from './Profile';
import Buttons from './Buttons';

function Navbar(props) {
    return (
        <div className={css['navbar-content']}>
            <div className={css['navbar-logo__text']}>forum</div>
            <div className={css['navbar-utility-bar']}>
                {props.page === 'login' || props.page === 'registration' ? (null):
                    (<><Menu/><SearchBox></SearchBox></>)}
                {props.isAuthorized === true ? (<Profile/>) : (<Buttons/>)}
            </div>
        </div>
    );
}

export default Navbar;
