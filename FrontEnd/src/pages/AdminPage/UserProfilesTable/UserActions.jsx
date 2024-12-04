import React, { useState } from 'react';
import { Dropdown, Modal, Button, message, Select, Input, Tooltip } from 'antd';
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

    const handleApiRequest = async (apiCall, successMessage, errorMessage) => {
        try {
            await apiCall();
            message.success(successMessage);
        } catch {
            message.error(errorMessage);
        }
    };

    const viewProfile = () => {
        try {
            navigate(`/customadmin/users/${user.id}`);
        } catch (error) {
            message.error('Не вдалося переглянути профіль. Спробуйте оновити сторінку.');
        }
    };

    const menuItems = [
        {
            key: 'sendMessage',
            label: (
                <Tooltip title="Відправити повідомлення на email">
                    Надіслати листа
                </Tooltip>
            ),
            onClick: () => handleActionClick('sendMessage'),
        },
        {
            key: 'viewProfile',
            label: (
                <Tooltip title="Переглянути детальний профіль користувача">
                    Переглянути профіль
                </Tooltip>
            ),
            onClick: () => handleActionClick('viewProfile'),
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

        setIsSending(true);
        await handleApiRequest(
            () =>
                axios.post(
                    `${process.env.REACT_APP_BASE_API_URL}/api/admin/users/${user.id}/send_message/`,
                    {
                        email: user.email,
                        category: selectedCategory,
                        message: messageContent.trim(),
                    }
                ),
            'Повідомлення успішно надіслано',
            'Не вдалося надіслати повідомлення. Спробуйте ще раз.'
        );
        setIsSending(false);
        setMessageContent('');
        setIsModalVisible(false);
        if (onActionComplete) onActionComplete();
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
