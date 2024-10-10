import css from './Menu.module.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../hooks';
import axios from 'axios';


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
    }
];

function Menu() {
    const { isAuth, logout, isSuperUser } = useAuth();

    const handleLogout = async () => {
        if (isAuth) {
            axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/auth/token/logout`)
                .then(() => {
                    logout();
                });
        }
    };

    return (
        <div className={css['menu-section']}>
            {[
                ...MENU,
                ...(isSuperUser ? SUPERUSER_MENU : [])
            ].map((element) => (
                <Link className={css['menu-section-element']} key={element.id} to={element.link}>
                    {element.title}
                </Link>
            ))}
            <div className={css['menu-section-divider']}></div>
            <button className={css['menu-section-logout']} onClick={handleLogout}>Вихід</button>
        </div>
    );
}

export default Menu;
