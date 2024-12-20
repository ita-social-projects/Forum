import { useState } from 'react';
import {Modal, Button, Input} from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './CategoriesActions.module.css';


function CategoriesActions({ category, onActionComplete }) {
    const [messageContent, setMessageContent] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [error, setError] = useState('');

    const validateMessage = (message) => {
        if (message.trim().length >= 2) {
            setError('');
            return true;
        } else {
            setError('Назва категорії має бути не менше 2 символів.');
            return false;
        }
    };

    const handleSendMessage = async () => {
        if (!validateMessage(messageContent)) return;

        setIsSending(true);
        try {
            await axios.patch(
                `${process.env.REACT_APP_BASE_API_URL}/api/admin/categories/${category.id}/`,
                {
                    name: messageContent.trim(),
                }
            );
            toast.success('Успішно змінено');
            setMessageContent('');
            setIsModalVisible(false);
            if (onActionComplete) onActionComplete();
        } catch {
            toast.error('Не вдалося змінити. Спробуйте ще раз.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <>
            <Button key="cancel" onClick={() => setIsModalVisible(true)}>Змінити</Button>
            <Modal
                title={`Змінити назву ${category.name}`}
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
                        Змінити
                    </Button>,
                ]}
                width={600}
            >
                <div className={styles.CategoriesActionsModalContent}>
                    <Input.TextArea
                        rows={1}
                        placeholder={`${category.name}`}
                        value={messageContent}
                        onChange={(e) => {
                            const input = e.target.value;
                            setMessageContent(input);
                            validateMessage(input);
                        }}
                        className={styles.CategoriesActionsTextarea}
                    />
                    {error && <p className={styles.CategoriesActionsError}>{error}</p>}
                </div>
            </Modal>
        </>
    );
}

CategoriesActions.propTypes = {
    category: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
    }).isRequired,
    onActionComplete: PropTypes.func,
};

export default CategoriesActions;
