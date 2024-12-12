import { Dropdown, Button, Tooltip } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function UserActionsProfiles({ profile }) {
    const navigate = useNavigate();
    const viewProfile = () => {
        try {
            navigate(`/customadmin/profile/${profile.id}`);
        } catch (error) {
            toast.error('Не вдалося переглянути профіль. Спробуйте оновити сторінку.');
        }
    };

    const menuItems = [
        {
            key: 'viewProfile',
            label: (
                <Tooltip title="Переглянути детальний профіль компанії">
                    Переглянути профіль
                </Tooltip>
            ),
            onClick: viewProfile,
        },
    ];

    return (
        <>
            <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                <Button>Обрати</Button>
            </Dropdown>
        </>
    );
}

UserActionsProfiles.propTypes = {
    profile: PropTypes.shape({
        id: PropTypes.number.isRequired,
    }).isRequired,
    onActionComplete: PropTypes.func,
};

export default UserActionsProfiles;
