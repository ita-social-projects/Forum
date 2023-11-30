import css from './Menu.module.css';
import { Link } from 'react-router-dom';

const MENU = [
    {
        id: 'am1',
        title: 'Користувачі',
        link: '/customadmin/users/'
    },
    {
        id: 'am2',
        title: 'Компанії',
        link: '/customadmin/companies/'
    },
];

function Menu() {
    return (
      <div className={css['menu-section']}>
          {MENU.map((element) =>(
              <Link className={css['menu-section-element']} key={element.id} to={element.link}>{element.title}</Link>
          ))}
          <div className={css['menu-section-divider']}></div>
          <Link className={css['menu-section-logout']} to={'#'}>Вихід</Link>
      </div>
    );
}

export default Menu;
