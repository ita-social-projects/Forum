import css from './Header.module.css';
import { Link } from 'react-router-dom';

function Header () {
    return (
        <header>
            <div className={css['header-content']}>
                <Link className={css['header-logo__text']} to="/customadmin/">admin panel</Link>
                <Link className={css['header-view__button']} to="/">Переглянути сайт</Link>
            </div>
            <div className={css['header-divider']}></div>
        </header>
    );
}

export default Header;
