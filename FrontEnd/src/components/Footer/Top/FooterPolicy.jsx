import css from './FooterPolicy.module.css';
import { Link } from 'react-router-dom';

const POLICY_LINKS = [
    {
        id: 'i0',
        title: 'Політика конфіденційності ',
        link: 'privacy-policy/'
    },
    {
        id: 'i1',
        title: 'Умови користування',
        link: 'terms-and-conditions/'
    },
    {
        id: 'i3',
        title: 'Contact',
        link: 'contact/'
    }
];

function FooterPolicy() {
    return (
        <div className={css['policy-content']}>
            <img
                className={css['policy-content__main-logo']}
                src={`${process.env.REACT_APP_PUBLIC_URL}/craftMerge-logo-white.svg`}
                alt="Footer craft merge logo"
                title="CraftMerge">
            </img>
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