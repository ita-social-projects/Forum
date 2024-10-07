import { NavLink, Route, Routes } from 'react-router-dom';

import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import ChangeAdminPassword from './ChangeAdminPassword';
import AdminInfo from './AdminInfo';

import classes from './AdminProfilePage.module.css';

const AdminProfilePage = ({ user }) => {

    const ADMIN_PAGE_TABS = [
        {
            title: 'Загальна інформація',
            link: '/admin-info',
        },
        {
            title: 'Змінити пароль',
            link: '/change-password',
        },
    ];

    return (
        <div className={classes['admin-profile__container']}>
            <BreadCrumbs currentPage="Профіль адміністратора" user={user}/>
            <div className={classes['admin-profile__content']}>
                <div className={classes['admin-profile__links']}>
                    {ADMIN_PAGE_TABS.map((element) => (
                        <NavLink
                            className={({ isActive }) => (`${classes['infolink']} ${isActive && classes['infolink__active']}`)}
                            to={`/customadmin/admin-profile${element.link}`}
                            key={element.title}
                        >
                            {element.title}
                        </NavLink>
                    ))}
                </div>
                <Routes>
                    <Route
                        path="admin-info"
                        element={<AdminInfo user={user}/>} />
                    <Route
                        path="change-password"
                        element={<ChangeAdminPassword user={user}/>} />
                </Routes>
            </div>
        </div>
    );
};

export default AdminProfilePage;