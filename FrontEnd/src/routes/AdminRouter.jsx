import { ToastContainer } from 'react-toastify';
import '../pages/AdminPage/AdminGlobal.css';
import Header from '../components/Header/Header';
import Menu from '../pages/AdminPage/Menu/Menu';
import UserDetail from '../pages/AdminPage/DetailView/UserDetail';
import UserTable from '../pages/UserTable/UserTable';
import ProfilesTable from '../pages/UserTable/ProfilesTable';
import ProfileDetail from '../pages/AdminPage/DetailView/ProfileDetail';
import css from '../pages/AdminPage/AdminPage.module.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/AdminPage/MainPage/MainPage';
import { useAuth } from '../hooks';
import Loader from '../components/Loader/Loader';
import AutoApproveDelay from '../pages/AdminPage/AutoApproveDelay/AutoApproveDelay';
import ModerationEmail from '../pages/AdminPage/DetailView/ModerationEmail';
import Contacts from './detail-view/Contacts';


function AdminRouter() {
    const { isLoading, isAuth, isStaff } = useAuth();
    const renderMenu = isStaff && isAuth ? <Menu /> : null;
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
        </>
    ) : (
        <Route path="/customadmin/" />
    );

    return (
        <div className={css['admin_block']}>
            <Header className={css['header_content']} />
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
