import FooterAddress from './FooterComponents/FooterAddress';
import FooterNavigation from './FooterComponents/FooterNavigation';
import FooterPolicy from './FooterComponents/FooterPolicy';
import ScrollToTopButton from './FooterComponents/ScrollToTopButton';

import useScrollToTop from '../../hooks/useScrollToTop';

import css from './Footer.module.css';


function Footer() {
    useScrollToTop();
    return (
        <footer className={css['footer-main']}>
            <div className={css['footer-content']}>
                <FooterAddress/>
                <FooterNavigation/>
                <FooterPolicy/>
            </div>
            <ScrollToTopButton />
        </footer>
    );
}

export default Footer;
