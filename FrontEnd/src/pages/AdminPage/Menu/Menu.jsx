import { NavLink } from 'react-router-dom';

import css from './Menu.module.css';

const MENU = [
    {
        id: 'am1',
        title: 'Користувачі',
        link: '/customadmin/users/'
    },
    {
        id: 'am2',
        title: 'Компанії',
        link: '/customadmin/profiles/'
    },
    {
        id: 'am3',
        title: 'Контакти',
        link: '/customadmin/contacts/'
    },
    {
        id: 'am4',
        title: 'Зміна часу автомодерації',
        link: '/customadmin/automoderation/'
    },
    {
        id: 'am5',
        title: 'Пошта адміністратора',
        link: '/customadmin/email/'
    },
    {
        id: 'am6',
        title: 'Реєстрація адміністратора',
        link: '/customadmin/admin-create/'
    }

];

function Menu() {

    return (
        <div className={css['menu-section']}>
            {MENU.map((element) => (
                <NavLink
                    className={({ isActive }) => (`${css['menu-section-element']} ${isActive && css['menu-section-element__active']}`)}
                    key={element.id} to={element.link}>{element.title}
                </NavLink>
            ))}
        </div>
    );
}

export default Menu;
