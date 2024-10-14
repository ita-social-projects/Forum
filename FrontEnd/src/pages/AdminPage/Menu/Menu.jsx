import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../hooks';
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
];

const SUPERUSER_MENU = [
    {
        id: 'am5',
        title: 'Пошта адміністратора',
        link: '/customadmin/email/'
    },
];

function Menu() {
    const { isSuperUser } = useAuth();

    return (
        <div className={css['menu-section']}>
            {[
                ...MENU,
                ...(isSuperUser ? SUPERUSER_MENU : [])
            ].map((element) => (
                <NavLink
                    className={({ isActive }) => (`${css['menu-section-element']} ${isActive && css['menu-section-element__active']}`)}
                    key={element.id} to={element.link}>{element.title}
                </NavLink>
            ))}
        </div>
    );
}

export default Menu;
