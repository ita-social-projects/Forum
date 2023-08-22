import css from './NavnarInfo.module.css';
import { Link, NavLink } from 'react-router-dom';

const NavnarInfo = (props) => {
    return (
        <div className={css['info-links-profile']}>
            {props.infolinks.map((element) => (
                <NavLink
                    className={({ isActive }) => (`${css['infolink']} ${isActive && css['infolink__active']}`)}
                    to={`/profile${element.link}`}
                    key={element.title}
                >{element.title}</NavLink>
            ))}
            <div className={css['divider']}></div>
            <Link to='/profile/delete' className={`${css['infolink']} ${css['delete']}`}>Видалити акаунт</Link>
        </div>
    );
};

export default NavnarInfo;