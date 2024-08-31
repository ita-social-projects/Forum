import { ToastContainer } from 'react-toastify';
import './AdminGlobal.css';
import Header from '../../components/Admin/Header/Header';
import Menu from './Menu/Menu';
import UserDetail from './DetailView/UserDetail';
import UserTable from './Table/UserTable';
import ProfilesTable from './Table/ProfilesTable';
import ProfileDetail from './DetailView/ProfileDetail';
import css from './AdminPage.module.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './MainPage/MainPage';
import { useAuth } from '../../hooks';
import Loader from '../../components/Loader/Loader';
import AutoApproveDelay from './AutoApproveDelay/AutoApproveDelay';

function AdminPage() {
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

export default AdminPage;
