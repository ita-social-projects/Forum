import css from './Footer.module.css';
import FooterPolicy from './FooterComponents/FooterPolicy';
import FooterNavigation from './FooterComponents/FooterNavigation';


function Footer() {
    return (
        <footer className={css['footer-content']}>
                <FooterPolicy></FooterPolicy>
                <FooterNavigation></FooterNavigation>
        </footer>
    );
}

export default Footer;
