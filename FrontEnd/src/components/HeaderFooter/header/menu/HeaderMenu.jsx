import { Link } from "react-router-dom";
import css from "./HeaderMenu.module.css";

const SERVICES_LINKS = [
  {
    title: "Виробники",
    link: "/profiles/producers",
  },
  {
    title: "Імпортери",
    link: "/profiles/importers",
  },
  {
    title: "Роздрібні мережі",
    link: "/profiles/retailers",
  },
  {
    title: "HORECA",
    link: "/profiles/horeca",
  },
  {
    title: "Інші послуги",
    link: "#",
  },
];

function HeaderMenu() {
  return (
    <div className={css["menu"]}>
      <div className={css["menu-section"]}>
        <div className={css["menu-section-content"]}>
          {SERVICES_LINKS.map((element) => (
            <div className={css["menu-element"]} key={element.link}>
              <Link className={css["menu-element__text"]} to={element.link}>
                {element.title}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HeaderMenu;
