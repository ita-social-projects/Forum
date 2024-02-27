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
];

function Menu() {
    const auth = useAuth();
    const handleLogout = async () => {
        if (auth.isAuth) {
            axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/auth/token/logout`)
                .then(() => {
                    auth.logout();
                });
        }
    };

    return (
        <div className={css['menu-section']}>
            {MENU.map((element) => (
                <Link className={css['menu-section-element']} key={element.id} to={element.link}>{element.title}</Link>
            ))}
            <div className={css['menu-section-divider']}></div>
            <button className={css['menu-section-logout']} onClick={handleLogout}>Вихід</button>
        </div>
    );
}

export default Menu;
