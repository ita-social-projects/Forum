import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Tooltip } from 'antd';
import useSWR from 'swr';
import axios from 'axios';
import css from './AutoApproveDelay.module.css';

const AutoApproveDelay = () => {
    const fetcher = url => axios.get(url).then(res => res.data).catch((e) => {
        if (!e.response || e.response.status !== 401) {
            toast.error('Помилка зв`язку із сервером.');
        }
    });
    const url = `${process.env.REACT_APP_BASE_API_URL}/api/admin/automoderation/`;
    const { data, mutate } = useSWR(url, fetcher);
    const [delay, setDelay] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (data && data.auto_moderation_hours) {
            setDelay(data.auto_moderation_hours);
        }
    }, [data]);

    const handleInputChange = (e) => {
        const value = Number(e.target.value);
        setError(null);
        setDelay(value);
        if (!(1 <= value && value <= 48) || !Number.isInteger(value)) {
            setError('Кількість годин має бути в діапазоні 1-48 години');
        }
    };

    const handleSubmit = () => {
        !error && axios.put(`${process.env.REACT_APP_BASE_API_URL}/api/admin/automoderation/`, { 'auto_moderation_hours': delay })
            .then(() => { toast.success('Зміни успішно застосовано.'); mutate({ ...data, auto_moderation_hours: delay }); })
            .catch(() => toast.error('Не вдалося зберегти зміни, сталася помилка'));
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