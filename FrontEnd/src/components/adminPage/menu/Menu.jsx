import css from './Menu.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks';


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
    const navigate = useNavigate();
    const handleLogout = async () => {
        auth.logout();
        navigate('/');
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
