import css from "./FooterBottom.module.css"
import logo from "./opentech_logo.svg"

function FooterBottom() {
    return (
        <div className={css["footer-bottom"]}>
            <div className={css["footer-bottom__text"]}>Copyright 2023 Forum. All rights reserved.</div>
            <img className={css["footer-bottom-logo__svg"]} src={logo} alt=""/>
        </div>
    );
}

export default FooterBottom;
