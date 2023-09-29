import { Link } from "react-router-dom";
import css from "./Menu.module.css";
import { HashLink } from "react-router-hash-link";

const MENU_LINKS = [
  {
    title: "Головна",
    link: "/",
  },
  {
    title: "Компанії",
    link: "/profiles/companies",
  },
  {
    title: "Стартапи",
    link: "/profiles/startups",
  },
  {
    title: "Про нас",
    link: "/#about-us",
  },
];

function Menu() {
  return (
    <div className={css["header-menu-section"]}>
      {MENU_LINKS.map((element) => (
        <div className={css["header-menu-element"]} key={element.link}>
          {element.title === "Про нас" ? (
            <HashLink
              className={css["header-menu-element__text"]}
              to={element.link}
            >
              {element.title}
            </HashLink>
          ) : (
            <Link
              className={css["header-menu-element__text"]}
              to={element.link}
            >
              {element.title}
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

export default Menu;
