import FooterTop from "./top/FooterTop";
import FooterBottom from "./bottom/FooterBottom";
import ShortFooter from "./short/ShortFooter";
import css from "./Footer.module.css"

const UNSUITABLE_PAGES = ["login", "register"]

function Footer(props) {
    return (
        <footer className={css["footer-content"]}>
            {UNSUITABLE_PAGES.includes(props.page) ? (<ShortFooter/>) :
                (<>
                    <FooterTop></FooterTop>
                    <FooterBottom></FooterBottom>
                </>)}
        </footer>
    )
}

export default Footer;
