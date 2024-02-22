import { Link } from 'react-router-dom';
import css from './ShortFooter.module.css';

const LINKS = [
    {
        id: 'i0',
        title: 'Privacy Policy',
        link: 'google.com'
    },
    {
        id: 'i1',
        title: 'Terms & Conditions',
        link: 'google.com'
    },
    {
        id: 'i2',
        title: 'Cookie Policy',
        link: 'google.com'
    },
    {
        id: 'i3',
        title: 'Contact',
        link: 'google.com'
    }
];

function ShortFooter() {
    return (
        <footer>
            <div className={css['footer-content']}>
                <div className={css['footer-logos']}>
                    <div className={css['footer-logo__text']}>forum</div>
                </div>
                <div className={css['footer-info']}>
                    <div className={css['footer-info__text']}>Copyright 2022 Company name.</div>
                    <div className={css['footer-links']}>
                        {LINKS.map( (element) => (
                            <Link className={css['footer-link__text']} key={element.id} to={element.link}>{element.title}</Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default ShortFooter;