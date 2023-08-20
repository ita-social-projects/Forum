import css from "./Header.module.css"
import Buttons from "./Buttons";
import Menu from "./Menu";
import Profile from "./Profile";
import SearchBox from "./SearchBox";

function Header (props) {
    return (
        <header>
            <div className={css["header-logo__text"]}>forum</div>
            <div className={css["header-utility-bar"]}>
                {/* {props.isAuthorized === true && <Menu/>} */}
                <Menu/>
                {/* {props.page === "login" || props.page === "registration" ? (null):
                    (<SearchBox></SearchBox>)} */}
                {props.isAuthorized === true ? (<Profile/>) : (<Buttons/>)}
            </div>
        </header>
    );
};

export default Header;
