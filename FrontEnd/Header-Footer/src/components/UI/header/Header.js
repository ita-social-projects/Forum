import css from "./Header.module.css"
import Buttons from "./Buttons";
import Menu from "./Menu";
import Profile from "./Profile";
import SearchBox from "./SearchBox";

function Header (props) {

    return (
        <header>
            <div className={css["header-logo-text"]}>forum</div>
            <div className={css["header-right-part"]}>
                {props.isAuthorized === true && <Menu/>}
                {props.page === "login" || props.page === "registration" ? (null):
                    (<SearchBox></SearchBox>)}
                {props.isAuthorized === true ? (<Profile/>) : (<Buttons/>)}
            </div>
        </header>
    );
};

export default Header;
