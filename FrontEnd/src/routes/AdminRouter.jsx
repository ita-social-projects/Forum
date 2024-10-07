import { ToastContainer } from 'react-toastify';
import { Routes, Route, useLocation } from 'react-router-dom';

import { useAuth } from '../hooks';

import Header from '../components/Header/Header';
import Menu from '../pages/AdminPage/Menu/Menu';
import UserDetail from '../pages/AdminPage/DetailView/UserDetail';
import UserTable from '../pages/AdminPage/UserProfilesTable/UserTable';
import ProfilesTable from '../pages/AdminPage/UserProfilesTable/ProfilesTable';
import ProfileDetail from '../pages/AdminPage/DetailView/ProfileDetail';
import MainPage from '../pages/AdminPage/MainPage/MainPage';
import Loader from '../components/Loader/Loader';
import AutoApproveDelay from '../pages/AdminPage/AutoApproveDelay/AutoApproveDelay';
import ModerationEmail from '../pages/AdminPage/DetailView/ModerationEmail';
import Contacts from '../pages/AdminPage/DetailView/Contacts';
import AdminProfilePage from '../pages/AdminPage/AdminProfile/AdminProfilePage';

import '../pages/AdminPage/AdminGlobal.css';
import css from '../pages/AdminPage/AdminPage.module.css';

function AdminRouter() {
    const { isLoading, isAuth, isStaff, user } = useAuth();
    const { pathname } = useLocation();
    const hideMenu = pathname.includes('/admin-profile/');
    const renderMenu = isStaff && isAuth && !hideMenu ? <Menu /> : null;
    const authRoutes = isStaff && isAuth ? (
        <>
            <Route path="/" element={<MainPage />} />
            <Route path="/users" element={<UserTable />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/profiles" element={<ProfilesTable />} />
            <Route path="/profile/:id" element={<ProfileDetail />} />
            <Route path="/automoderation" element={<AutoApproveDelay />} />
            <Route path="/email" element={<ModerationEmail />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/admin-profile/*" element={<AdminProfilePage user={user}/>} />
        </>
    ) : (
        <Route path="/customadmin/" />
    );

    return (
        <div className={css['admin_block']}>
            <Header isAuthorized={isAuth} user={user} className={css['header_content']} />
            {isLoading ? <Loader /> :
                <div className={css['content']}>
                    {renderMenu}
                    <Routes className={css['content-block']}>
                        {authRoutes}
                    </Routes>
                </div>
            }
            <ToastContainer
                position="top-right"
                autoClose={3000}
                theme="colored"
                icon={false}
            />
        </div>
    );
}

export default AdminRouter;
