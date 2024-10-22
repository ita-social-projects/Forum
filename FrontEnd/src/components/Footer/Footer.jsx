import css from './Footer.module.css';
import FooterPolicy from './FooterComponents/FooterPolicy';
import FooterNavigation from './FooterComponents/FooterNavigation';
import FooterAddress from './FooterComponents/FooterAddress';
import useScrollToTop from '../../hooks/useScrollToTop';


function Footer() {
    useScrollToTop();
    return (
        <footer className={css['footer-content']}>
            <FooterAddress></FooterAddress>
            <FooterNavigation></FooterNavigation>
            <FooterPolicy></FooterPolicy>
        </footer>
    );
}

export default Footer;
