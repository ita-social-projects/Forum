import css from "./CookiesPolicyComponent.module.css"
import {cookiesPolicy} from "./Text";

function CookiesPolicyComponent () {
    return (
        <div>
            <div className={css["root-container"]}>
                <div className={css["cookies-main"]}>
                    <div className={css["title-container"]}>
                        <h1 className={css["title"]}>Cookies Policy</h1>
                        <p className={css["description"]}>{cookiesPolicy.intro}</p>
                    </div>
                </div>
            </div>
            <div className={css["cookies-section"]}>
                <h4>Updated: {cookiesPolicy.updated}</h4>
                {cookiesPolicy.sections.map((section) => (
                    <p key={section.id}>
                        <h2>{section.title}</h2>
                        <p>{section.content}</p>
                    </p>
                ))}
            </div>
        </div>
    )
};

export default CookiesPolicyComponent;