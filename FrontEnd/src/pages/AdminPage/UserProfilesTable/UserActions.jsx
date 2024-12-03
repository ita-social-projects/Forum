import React, { useState } from 'react';
import { Dropdown, Modal, Button, message, Select, Input } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './UserActions.module.css';
import { useNavigate } from 'react-router-dom';

function UserActions({ user, onActionComplete }) {
    const [selectedCategory, setSelectedCategory] = useState('Інше');
    const [messageContent, setMessageContent] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

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

    const handleActionClick = (action) => {
        switch (action) {
            case 'sendMessage':
                setIsModalVisible(true);
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

    const validateMessage = () => {
        if (messageContent.trim().length < 10) {
            setError('Повідомлення має бути не менше 10 символів.');
            return false;
        }
        setError('');
        return true;
    };

    const handleSendMessage = async () => {
        if (!validateMessage()) return;

        try {
            setIsSending(true);
            await axios.post(
                `${process.env.REACT_APP_BASE_API_URL}/api/admin/users/${user.id}/send_message/`,
                {
                    email: user.email,
                    category: selectedCategory,
                    message: messageContent.trim(),
                }
            );
            message.success('Повідомлення успішно надіслано');
            setMessageContent('');
            setIsModalVisible(false);
            if (onActionComplete) onActionComplete();
        } catch (error) {
            message.error(
                error.response?.data?.detail ||
                'Не вдалося надіслати повідомлення. Спробуйте ще раз.'
            );
        } finally {
            setIsSending(false);
        }
    };

    const viewProfile = () => {
        navigate(`/customadmin/users/${user.id}`);
    };
    const confirmBlockUser = () => {
        Modal.confirm({
            title: `Підтвердити блокування користувача ${user.name} ${user.surname}`,
            icon: <ExclamationCircleOutlined className={styles.userActionsIcon} />,
            content: (
                <p className={styles.userActionsModalText}>
                    Ви впевнені, що хочете заблокувати цього користувача? Ця дія зробить обліковий запис неактивним.
                </p>
            ),
            okText: 'Так',
            cancelText: 'Відмінити',
            onOk: async () => {
                try {
                    const response = await axios.patch(
                        `${process.env.REACT_APP_BASE_API_URL}/api/admin/users/${user.id}/block/`
                    );
                    if (response.status === 204) {
                        message.success('Користувача успішно заблоковано.');
                        if (onActionComplete) onActionComplete();
                    }
                } catch (error) {
                    const status = error.response?.status;
                    if (status === 400) {
                        message.error('Користувач вже неактивний. Неможливо заблокувати неактивного користувача.');
                    } else if (status === 404) {
                        message.error('Користувача не знайдено.');
                    } else {
                        message.error('Сталася помилка. Спробуйте пізніше.');
                    }
                }
            },
        });
    };

    return (
        <>
            <Dropdown menu={{ items: menuItems }} trigger={['click']}>
                <Button>Обрати</Button>
            </Dropdown>
            <Modal
                title={`Надіслати листа користувачу ${user.name} ${user.surname}`}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setError('');
                    setMessageContent('');
                }}
                footer={[
                    <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                        Відмінити
                    </Button>,
                    <Button
                        key="send"
                        type="primary"
                        loading={isSending}
                        onClick={handleSendMessage}
                    >
                        Відправити
                    </Button>,
                ]}
                width={600}
            >
                <div className={styles.userActionsModalContent}>
                    <Input
                        value={user.email}
                        readOnly
                        className={styles.userActionsInput}
                        addonBefore="Email"
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
                        rows={6}
                        placeholder="Введіть ваше повідомлення..."
                        value={messageContent}
                        onChange={(e) => setMessageContent(e.target.value)}
                        className={styles.userActionsTextarea}
                    />
                    {error && <p className={styles.userActionsError}>{error}</p>}
                </div>
            </Modal>
        </>
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
