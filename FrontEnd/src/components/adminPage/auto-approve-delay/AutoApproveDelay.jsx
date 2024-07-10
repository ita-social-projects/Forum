import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Tooltip } from 'antd';
import axios from 'axios';
import css from './AutoApproveDelay.module.css';

const AutoApproveDelay = () => {

    const [delay, setDelay] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/admin/automoderation/`);
                if (response.data && response.data.auto_moderation_hours) {
                    setDelay(response.data.auto_moderation_hours);
                } else {
                    throw new Error('Помилка з`єднання з сервером');
                }
            } catch (err) {
                toast.error(err.message);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        let value = e.target.value;
        setError(null);
        setDelay(value);
        if (!(1 <= value) || !(value <= 48) || !Number.isInteger(Number(value))) {
            setError('Кількість годин має бути в діапазоні 1-48 години');
        }
    };

    const handleSubmit = () => {
        !error && axios.put(`${process.env.REACT_APP_BASE_API_URL}/api/admin/automoderation/`, { 'auto_moderation_hours': delay })
            .then(() => toast.success('Зміни успішно застосовано.'))
            .catch((e) => toast.error(e.message));
    };
    return (
        <div className={css['autoapprove-section']}>
            <Tooltip
                title={'Введіть значення 1-48'}
                placement="top"
                pointAtCenter={true}>
            <input className={css['autoapprove-input']} type="number" step={1} onChange={handleInputChange} value={delay} />
            </Tooltip>
            {error &&
                <p className={css['error-message']}>{error}</p>}
            <button className={css['save-button']} onClick={handleSubmit}>Змінити</button>
        </div>
    );

};

export default AutoApproveDelay;