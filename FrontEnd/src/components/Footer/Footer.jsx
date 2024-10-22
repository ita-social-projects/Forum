import css from './Footer.module.css';
import FooterPolicy from './FooterComponents/FooterPolicy';
import FooterNavigation from './FooterComponents/FooterNavigation';


function Footer() {
    return (
        <footer className={css['footer-content-main']}>
            <div className={css['footer-top-content']}>
                <FooterPolicy></FooterPolicy>
                <FooterNavigation></FooterNavigation>
            </div>
        </footer>
    );
}

export default Footer;
