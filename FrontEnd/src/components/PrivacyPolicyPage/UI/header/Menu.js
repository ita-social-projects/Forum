import { Link } from 'react-router-dom';
import css from './Menu.module.css';

const MENU = [
    {
        id: 'm0',
        title: 'Головна',
        link: '',
    },
    {
        id: 'm1',
        title: 'Компанії',
        link: '',
    },
    {
        id: 'm2',
        title: 'Стартапи',
        link: '',
    },
    {
        id: 'm3',
        title: 'Про нас',
        link: '',
    },
];

function Menu() {
    return (
        <div className={css['header-menu-section']}>
            {MENU.map((element) => (
                <div key={element.id} className={css['header-menu-element']}>
                    <Link className={css['header-menu-element__text']} key={element.id} to={element.link}>
                        {element.title}
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Menu;
