import Footer from "../HeaderFooter/footer/Footer";
import Header from "./header/Header";
import Menu from "./menu/Menu";
import UserDetail from "./detail-view/UserDetail";
import UserTable from "./table/UserTable";
import CompanyTable from "./table/CompanyTable";
import CompanyDetail from "./detail-view/CompanyDetail";
import css from "./AdminPage.module.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function AdminPage() {
    return (
        <div>
            <Header />
                <div className={css["content"]}>
                        <Menu />
                        <Routes>
                            <Route path="/users" element={<UserTable />} />
                            <Route path="/users/:id" element={<UserDetail />} />
                            <Route path="/companies" element={<CompanyTable />} />
                            <Route path="/company/:id" element={<CompanyDetail />} />
                        </Routes>
                </div>
        </div>

    );
};

export default AdminPage;
