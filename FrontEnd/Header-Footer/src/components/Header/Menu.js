import css from "./Menu.module.css"

const MENU = [
    {
        title: "Головна",
        link: ""
    },
    {
        title: "Компанії",
        link: ""
    },
    {
        title: "Стартапи",
        link: ""
    },
    {
        title: "Про нас",
        link: ""
    },
]

function Menu () {
    return (
        <div className={css["header-menu-section"]}>
            {MENU.map( (element) => (
                <div className={css["header-menu-element"]}>
                    <a className={css["header-menu-element-text"]} href={element.link}>{element.title}</a>
                </div>
            ))}
        </div>
    );
};

export default Menu;
