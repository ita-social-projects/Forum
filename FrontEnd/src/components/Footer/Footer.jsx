import css from './Footer.module.css';
import FooterPolicy from './FooterComponents/FooterPolicy';
import FooterNavigation from './FooterComponents/FooterNavigation';
import FooterAddress from './FooterComponents/FooterAddress';
import useScrollToTop from '../../hooks/useScrollToTop';
import ScrollToTopButton from './FooterComponents/ScrollToTopButton';


function Footer() {
    useScrollToTop();
    return (
        <footer className={css['footer-main']}>
            <div className={css['footer-content']}>
                <FooterAddress></FooterAddress>
                <FooterNavigation></FooterNavigation>
                <FooterPolicy></FooterPolicy>
            </div>
            <ScrollToTopButton />
        </footer>
    );
}

export default Footer;
