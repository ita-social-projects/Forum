import { Link } from 'react-router-dom';
import css from './Menu.module.css';
import { HashLink } from 'react-router-hash-link';

const MENU_LINKS = [
    {
        id: 'm0',
        title: 'Головна',
        link: '/'
    },
    {
        title: 'Компанії',
        link: '/profiles/companies'
    },
    {
        title: 'Стартапи',
        link: '/profiles/startups'
    },
    {
        title: 'Про нас',
        link: '/#about-us'
    },
];

function Menu() {
  console.log(MENU_LINKS.map((element) => (element.title.startsWith('/#'))));
  return (
    <div className={css['header-menu-section']}>
      {MENU_LINKS.map((element) => (
        <div className={css['header-menu-element']} key={element.link}>
          {element.link.startsWith('/#') ? (
            <HashLink
              className={css['header-menu-element__text']}
              to={element.link}
            >
              {element.title}
            </HashLink>
          ) : (
            <Link
              className={css['header-menu-element__text']}
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
