import FooterTop from './Top/FooterTop';
import FooterBottom from './Bottom/FooterBottom';
import ShortFooter from './Short/ShortFooter';
import css from './Footer.module.css';

const UNSUITABLE_PAGES = ['login', 'register'];

function Footer(props) {
    return (
        <footer className={css['footer-content-main']}>
            {UNSUITABLE_PAGES.includes(props.page) ? (<ShortFooter/>) :
                (<>
                    <FooterTop></FooterTop>
                    <FooterBottom></FooterBottom>
                </>)}
        </footer>
    );
}

export default Footer;
