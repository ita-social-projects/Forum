import css from "./CookiesPolicyComponent.module.css"
import {cookiesPolicy} from "./Text";

function CookiesPolicyComponent () {
    return (
        <div className={css["cookies-section"]}>
            <div className={css["divider"]}></div>
            <h1>Cookies Policy</h1>
            <h4>Updated: {cookiesPolicy.updated}</h4>
            <p>{cookiesPolicy.intro}</p>
            {cookiesPolicy.sections.map((section) => (
                <p key={section.id}>
                    <h2>{section.title}</h2>
                    <p>{section.content}</p>
                </p>
            ))}
        </div>
    )
};

export default CookiesPolicyComponent;