import css from './FooterTop.module.css';
import FooterPolicy from './FooterPolicy';
import FooterNavigation from './FooterNavigation';

function FooterTop() {
    return (
        <div className={css['footer-top']}>
            <div className={css['footer-top-content']}>
                <FooterPolicy></FooterPolicy>
                <FooterNavigation></FooterNavigation>
            </div>
        </div>
    );
}

export default FooterTop;
