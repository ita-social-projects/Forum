import { Button } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './UserActionsProfiles.module.css';

function UserActionsProfiles({ profile }) {
    const navigate = useNavigate();
    const viewProfile = () => {
        try {
            navigate(`/customadmin/profile/${profile.id}`);
        } catch (error) {
            toast.error('Не вдалося переглянути профіль. Спробуйте оновити сторінку.');
        }
    };

    return (
        <Button className={styles['profileButton']} onClick={viewProfile}>
            Переглянути профіль
        </Button>
    );
}

UserActionsProfiles.propTypes = {
    profile: PropTypes.shape({
        id: PropTypes.number.isRequired,
    }).isRequired,
    onActionComplete: PropTypes.func,
};

export default UserActionsProfiles;
