import css from "./Footer.module.css"

const LINKS = [
    {
        title: "Privacy Policy",
        link: "google.com"
    },
    {
        title: "Terms & Conditions",
        link: "google.com"
    },
    {
        title: "Cookie Policy",
        link: "google.com"
    },
    {
        title: "Contact",
        link: "google.com"
    }
]

function Footer() {
    return (
        <footer>
            <div className={css['footer-content']}>
                <div className={css["footer-logo-text"]}>forum</div>
                <div className={css["footer-info"]}>
                    <div className={css["footer-info-text"]}>Copyright 2022 Company name.</div>
                    <div className={css["footer-links"]}>
                        {LINKS.map( (element) => (
                            <a className={css["footer-link"]} href={element.link}>{element.title}</a>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    )
};

export default Footer;