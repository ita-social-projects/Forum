import css from './Footer.module.css';
import FooterPolicy from './FooterComponents/FooterPolicy';
import FooterNavigation from './FooterComponents/FooterNavigation';
import FooterAddress from './FooterComponents/FooterAddress';
import useScrollToTop from '../../hooks/useScrollToTop';


function Footer() {
    useScrollToTop();
    return (
        <footer className={css['footer-main']}>
            <div className={css['footer-content']}>
            <FooterAddress></FooterAddress>
            <FooterNavigation></FooterNavigation>
            <FooterPolicy></FooterPolicy>
            </div>
        </footer>
    );
}

export default Footer;
