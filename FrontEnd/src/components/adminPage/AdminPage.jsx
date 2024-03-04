import './AdminGlobal.css';
import Header from './header/Header';
import Menu from './menu/Menu';
import UserDetail from './detail-view/UserDetail';
import UserTable from './table/UserTable';
import ProfilesTable from './table/ProfilesTable';
import ProfileDetail from './detail-view/ProfileDetail';
import css from './AdminPage.module.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './mainPage/MainPage';
import { useAuth } from '../../hooks';
import Loader from '../loader/Loader';

function AdminPage() {
    const { isLoading, isStaff, isAuth } = useAuth();
    const renderMenu =  isStaff && isAuth ? <Menu /> : null;
    const authRoutes =  isStaff && isAuth ? (
        <>
            <Route path="/" element={<MainPage />} />
            <Route path="/users" element={<UserTable />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/profiles" element={<ProfilesTable />} />
            <Route path="/profile/:id" element={<ProfileDetail />} />
        </>
    ) : (
        <Route path="/customadmin/"  />
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
        </div>
    );
}

export default AdminPage;
