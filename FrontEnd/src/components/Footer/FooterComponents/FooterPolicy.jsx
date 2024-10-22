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
];

function FooterPolicy() {
    return (
        <div className={css['policy-content']}>
            <div className={css['policy-divider']}></div>
            <div className={css['policy-content-links']}>
                {POLICY_LINKS.map((element) => (
                    <Link
                        className={css['policy-content-links__text']}
                        key={element.id}
                        to={element.link}>
                        {element.title}
                    </Link>
                ))}
                <p className={css['policy-content__copyright']}> Copyright 2023 Forum. All rights reserved.</p>
            </div>
        </div>
    );
}

export default FooterPolicy;
