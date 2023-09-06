import css from "./Header.module.css"
import { Link } from "react-router-dom"

function Header (props) {
    return (
        <header>
            <div className={css["header-content"]}>
                <div className={css["header-logo__text"]}>admin panel</div>
                <Link className={css['header-view__button']} to="/">Переглянути сайт</Link>
            </div>
            <div className={css["header-divider"]}></div>
        </header>
    );
};

export default Header;
