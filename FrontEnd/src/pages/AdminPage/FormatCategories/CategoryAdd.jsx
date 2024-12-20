import { useState } from 'react';
import { Button, Input } from 'antd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from './CategoryAdd.module.css';

function CategoryAdd({ onActionComplete }) {
    const [messageContent, setMessageContent] = useState('');
    const [isSending, setIsSending] = useState(false);
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
            await axios.post(
                `${process.env.REACT_APP_BASE_API_URL}/api/admin/categories/`,
                {
                    name: messageContent.trim(),
                }
            );
            toast.success('Успішно створено');
            setMessageContent('');
            if (onActionComplete) onActionComplete();
        } catch {
            toast.error('Не вдалося змінити. Спробуйте ще раз.');
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className={styles.CategoryAddContainer}>
            <h3>Додайте категорію діяльності</h3>
            <p>Назва категорії</p>
            <div className={styles.CategoryAddEdit}>
                <Input.TextArea
                    rows={1}
                    placeholder="Нова категорія"
                    value={messageContent}
                    onChange={(e) => {
                        const input = e.target.value;
                        setMessageContent(input);
                        validateMessage(input);
                    }}
                    className={styles.CategoryAddTextarea}
                />
                {error && <p className={styles.CategoryAddError}>{error}</p>}
                <div className={styles.CategoryAddButtons}>
                    <Button
                        onClick={() => {
                            setError('');
                            setMessageContent('');
                        }}
                    >
                        Відмінити
                    </Button>
                    <Button
                        type="primary"
                        loading={isSending}
                        onClick={handleSendMessage}
                    >
                        Зберегти
                    </Button>
                </div>
            </div>
        </div>
    );
}

CategoryAdd.propTypes = {
    onActionComplete: PropTypes.func,
};

export default CategoryAdd;
