import FooterTop from "./top/FooterTop";
import FooterBottom from "./bottom/FooterBottom";
import ShortFooter from "./short/ShortFooter";

const UNSUITABLE_PAGES = ["login", "register", "profile"]

function Footer(props) {
    return (
        <footer>
            {UNSUITABLE_PAGES.includes(props.page) ? (<ShortFooter/>) :
                (<>
                    <FooterTop></FooterTop>
                    <FooterBottom></FooterBottom>
                </>)}
        </footer>
    )
};

export default Footer;
