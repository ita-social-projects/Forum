import css from './FooterPolicy.module.css';
import { Link } from 'react-router-dom';

const POLICY_LINKS = [
    {
        id: 'i0',
        title: 'Privacy Policy',
        link: 'privacy-policy/'
    },
    {
        id: 'i1',
        title: 'Умови користування',
        link: 'terms-and-conditions/'
    },
    {
        id: 'i2',
        title: 'Cookie Policy',
        link: 'cookies-policy/'
    },
    {
        id: 'i3',
        title: 'Contact',
        link: 'Contact/'
    }
];

function FooterPolicy() {
    return (
        <div className={css['policy-content']}>
            <div className={css['policy-content-logo']}>forum</div>
            <div className={css['policy-content-links']}>
                {POLICY_LINKS.map((element) => (
                    <Link
                        className={css['policy-content-links__text']}
                        key={element.id}
                        to={element.link}>
                        {element.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default FooterPolicy;
