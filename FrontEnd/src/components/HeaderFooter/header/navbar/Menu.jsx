import css from "./Menu.module.css"
import { HashLink } from 'react-router-hash-link';

const MENU_LINKS = [
    {
        id: "m0",
        title: "Головна",
        link: "/"
    },
    {
        id: "m1",
        title: "Компанії",
        link: "/profiles/companies"
    },
    {
        id: "m2",
        title: "Стартапи",
        link: "/profiles/startups"
    },
    {
        id: "m3",
        title: "Про нас",
        link: "/#about-us"
    },
]

function Menu () {
    return (
        <div className={css["header-menu-section"]}>
            {MENU_LINKS.map( (element) => (
                <div className={css["header-menu-element"]} key={element.id}>
                    <a className={css["header-menu-element__text"]} href={element.link}>{element.title}</a>
                </div>
            ))}
        </div>
    );
};

export default Menu;
