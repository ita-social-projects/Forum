import {useState, useEffect} from 'react';
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
import axios from 'axios';

function AdminPage() {
    const auth = useAuth();
    const [isStaff, setIsStaff] = useState(false);
    const authToken = localStorage.getItem('Token');
    axios.defaults.headers.common['Authorization'] = `Token ${authToken}`;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const staffStatus = await checkIfStaff();
                setIsStaff(staffStatus);
            } catch (error) {
                console.error('Error checking staff status:', error);
            }
        };

        fetchData();
    }, []);

    const renderMenu = auth.isAuth && isStaff ? (<Menu />) : null;
    const authRoutes = auth.isAuth && isStaff ? (
        <>
            <Route path="/" element={<MainPage />} />
            <Route path="/users" element={<UserTable />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/profiles" element={<ProfilesTable />} />
            <Route path="/profile/:id" element={<ProfileDetail />} />
        </>
    ) : (
        <Route path="/login" />
    );

    return (
        <div className={css['admin_block']}>
            < Header className={css['header_content']} disabled={!auth.isAuth && isStaff} />
            <div className={css['content']}>
                {renderMenu}
                <Routes className={css['content-block']}>
                    {authRoutes}
                </Routes>
            </div>
        </div>
    );
}

export default AdminPage;
