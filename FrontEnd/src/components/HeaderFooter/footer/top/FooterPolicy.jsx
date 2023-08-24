import css from "./FooterPolicy.module.css";
import { Link } from 'react-router-dom'

const POLICY_LINKS = [
    {
        id: "i0",
        title: "Privacy Policy",
        link: "PrivacyPolicyPage/"
    },
    {
        id: "i1",
        title: "Terms & Conditions",
        link: "TermsAndConditions/"
    },
    {
        id: "i2",
        title: "Cookie Policy",
        link: "CookiesPolicyPage/"
    },
    {
        id: "i3",
        title: "Contact",
        link: "#"
    }
]

function FooterPolicy() {
    return (
        <div className={css["policy-content"]}>
            <div className={css["policy-content-logo"]}>forum</div>
            <div className={css["policy-content-links"]}>
                {POLICY_LINKS.map((element) => (
                    <Link
                        className={css["policy-content-links__text"]}
                        key={element.id}
                        to={element.link}>
                        {element.title}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default FooterPolicy;
