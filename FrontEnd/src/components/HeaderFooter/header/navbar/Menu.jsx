import css from "./Menu.module.css"

const MENU_LINKS = [
    {
        id: "m0",
        title: "Головна",
        link: "#"
    },
    {
        id: "m1",
        title: "Компанії",
        link: "#"
    },
    {
        id: "m2",
        title: "Стартапи",
        link: "#"
    },
    {
        id: "m3",
        title: "Про нас",
        link: "#"
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
