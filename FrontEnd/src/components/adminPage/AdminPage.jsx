import { useState, useEffect } from 'react';
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
import checkIfStaff from './checkIfStaff';
import Loader from '../loader/Loader';

function AdminPage() {
    const { isAuth, isLoading } = useAuth();
    const [isStaff, setIsStaff] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isAuth) {
                    const staffStatus = await checkIfStaff();
                    setIsStaff(staffStatus);
                } else {
                    setIsStaff(false);
                }
            } catch (error) {
                console.error('Error checking staff status:', error);
            }
        };

        fetchData();
    }, []);

    const renderMenu = isStaff ? <Menu /> : null;
    const authRoutes = isStaff ? (
        <>
            <Route path="/" element={<MainPage />} />
            <Route path="/users" element={<UserTable />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/profiles" element={<ProfilesTable />} />
            <Route path="/profile/:id" element={<ProfileDetail />} />
        </>
    ) : (
        <Route path="/" />
    );

    return (
        <div className={css['admin_block']}>
            <Header className={css['header_content']} isAuthorized={isStaff} />
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
