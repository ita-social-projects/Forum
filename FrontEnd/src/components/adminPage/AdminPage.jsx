import Header from './header/Header';
// import Header_main from '../HeaderFooter/header/Header';
import Menu from './menu/Menu';
import UserDetail from './detail-view/UserDetail';
import UserTable from './table/UserTable';
import CompanyTable from './table/CompanyTable';
import CompanyDetail from './detail-view/CompanyDetail';
import css from './AdminPage.module.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './mainPage/MainPage';
import { useAuth } from '../../hooks';

function AdminPage() {
    const auth = useAuth();
    const authRoutes = auth.isAuth ? (
        <>
            <Route path="/" element={<MainPage />} />
            <Route path="/users" element={<UserTable />} />
            <Route path="/users/:id" element={<UserDetail />} />
            <Route path="/companies" element={<CompanyTable />} />
            <Route path="/company/:id" element={<CompanyDetail />} />
        </>
    ) : (
        <Route path="/login" />
    );

    return (
        <div>
            {/* <Header_main isAuthorized={auth.isAuth} /> */}
            <Header isAuthorized={auth.isAuth} />
            <div className={css['content']}>
                <Menu isAuthorized={auth.isAuth} />
                <Routes >
                    {authRoutes}
                </Routes>
            </div>
            {/* <Footer page="admin"></Footer> */}
        </div>
    );
}

export default AdminPage;
