import Footer from "../HeaderFooter/footer/Footer";
import Header from "./header/Header";
import Menu from "./menu/Menu";
import UserDetail from "./detail-view/UserDetail";
import UserTable from "./table/UserTable";
import css from "./AdminPage.module.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function AdminPage() {
    return (
        <div>
            <Header></Header>
                <div className={css["content"]}>
                        <Menu></Menu>
                        <Routes>
                            <Route path="/users" element={<UserTable />} />
                            <Route path="/users/:id" element={<UserDetail />} />
                        </Routes>
                </div>
            <Footer></Footer>
        </div>

    );
};

export default AdminPage;
