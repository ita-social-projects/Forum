import React, { useState } from 'react';
import { Dropdown, Modal, Button, message, Select, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './UserActions.module.css';

function UserActions({ user, onActionComplete }) {
    const [selectedCategory, setSelectedCategory] = useState('Інше');

    const handleActionClick = (action) => {
        switch (action) {
            case 'sendMessage':
                showSendMessageModal();
                break;
            case 'viewProfile':
                viewProfile();
                break;
            case 'blockUser':
                confirmBlockUser();
                break;
            default:
                console.error('Unknown action:', action);
        }
    };

    const showSendMessageModal = () => {
        let messageContent = '';
        Modal.confirm({
            title: `Надіслати листа користувачу ${user.name} ${user.surname}`,
            content: (
                <>
                    <Input
                        value={user.email}
                        readOnly
                        className={styles.userActionsInput}
                    />
                    <Select
                        defaultValue="Інше"
                        className={styles.userActionsSelect}
                        onChange={(value) => setSelectedCategory(value)}
                        options={[
                            { value: 'Технічне питання', label: 'Технічне питання' },
                            { value: 'Рекомендації', label: 'Рекомендації' },
                            { value: 'Питання', label: 'Питання' },
                            { value: 'Інше', label: 'Інше' },
                        ]}
                    />
                    <Input.TextArea
                        rows={4}
                        placeholder="Введіть ваше повідомлення..."
                        onChange={(e) => (messageContent = e.target.value)}
                        className={styles.userActionsTextarea}
                    />
                </>
            ),
            onOk: async () => {
                try {
                    await axios.post(
                        `${process.env.REACT_APP_BASE_API_URL}/api/admin/users/${user.id}/send_message/`,
                        {
                            email: user.email,
                            category: selectedCategory,
                            message: messageContent,
                        }
                    );
                    message.success('Повідомлення успішно надіслано');
                    if (onActionComplete) onActionComplete();
                } catch (error) {
                    message.error(
                        error.response?.data?.detail ||
                        'Не вдалося надіслати повідомлення. Спробуйте ще раз.'
                    );
                }
            },
        });
    };

    const viewProfile = () => {
        window.location.href = `/admin/users/${user.id}`;
    };

    const confirmBlockUser = () => {
        Modal.confirm({
            title: 'Підтвердити блокування користувача',
            icon: <ExclamationCircleOutlined />,
            content: `Ви впевнені, що хочете заблокувати користувача ${user.name} ${user.surname}?`,
            onOk: async () => {
                try {
                    console.log(`Blocked user: ${user.id}`);
                    message.success('Користувач успішно заблокований (імітація)');
                    if (onActionComplete) onActionComplete();
                } catch (error) {
                    message.error('Не вдалося заблокувати користувача. Спробуйте пізніше.');
                }
            },
        });
    };

    const menuItems = [
        {
            key: 'sendMessage',
            label: 'Надіслати листа',
            onClick: () => handleActionClick('sendMessage'),
        },
        {
            key: 'viewProfile',
            label: 'Переглянути профіль',
            onClick: () => handleActionClick('viewProfile'),
        },
        {
            key: 'blockUser',
            label: 'Заблокувати користувача',
            onClick: () => handleActionClick('blockUser'),
        },
    ];

    return (
        <Dropdown menu={{ items: menuItems }} trigger={['click']}>
            <Button>Обрати</Button>
        </Dropdown>
    );
}

UserActions.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
    }).isRequired,
    onActionComplete: PropTypes.func,
};

export default UserActions;
