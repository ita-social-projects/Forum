import React from 'react';
import { Dropdown, Modal, Button, message } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

function UserActions({ user, onActionComplete }) {
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
                <textarea
                    rows="4"
                    placeholder="Введіть ваше повідомлення..."
                    onChange={(e) => (messageContent = e.target.value)}
                    style={{ width: '100%' }}
                />
            ),
            onOk: async () => {
                try {
                    console.log(`Message to ${user.id}: ${messageContent}`);
                    message.success('Повідомлення успішно надіслано (імітація)');
                    if (onActionComplete) onActionComplete();
                } catch (error) {
                    message.error('Не вдалося надіслати повідомлення. Спробуйте ще раз.');
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

export default UserActions;
