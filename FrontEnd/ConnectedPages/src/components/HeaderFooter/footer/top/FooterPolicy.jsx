import css from "./FooterPolicy.module.css";

const POLICY_LINKS = [
    {
        id: "i0",
        title: "Privacy Policy",
        link: "#"
    },
    {
        id: "i1",
        title: "Terms & Conditions",
        link: "#"
    },
    {
        id: "i2",
        title: "Cookie Policy",
        link: "#"
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
                    <a className={css["policy-content-links__text"]}
                       key={element.id}
                       href={element.link}
                    >{element.title}</a>
                ))}
            </div>
        </div>
    );
};

export default FooterPolicy;
