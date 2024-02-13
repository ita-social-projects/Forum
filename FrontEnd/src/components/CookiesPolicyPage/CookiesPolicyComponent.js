import css from './CookiesPolicyComponent.module.css';
import { useEffect } from 'react';
import { cookiesPolicy } from './Text';

function CookiesPolicyComponent() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="block-cookies_policy block-size">
            <div className={css['root-container']}>
                <div className={css['cookies-main']}>
                    <div className={css['title-container']}>
                        <h2 className={css['title']}>Cookies Policy</h2>
                        <p className={css['description']}>{cookiesPolicy.intro}</p>
                    </div>
                </div>
            </div>
            <div className={css['cookies-section']}>
                <ul>
                    <h4>Updated: {cookiesPolicy.updated}</h4>
                    {cookiesPolicy.sections.map((section) => (
                        <li key={section.id}>
                            <h3>{section.title}</h3>
                            <p>{section.content}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default CookiesPolicyComponent;
