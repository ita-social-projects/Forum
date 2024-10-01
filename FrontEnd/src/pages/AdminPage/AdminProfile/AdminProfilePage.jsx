import ChangeAdminPassword from './ChangeAdminPassword';
import AdminInfo from './AdminInfo';

const AdminProfilePage = ({ user }) => {

    return (
        <div>
            <AdminInfo user={ user } />
            <ChangeAdminPassword user={ user } />
        </div>
    );
};

export default AdminProfilePage;