import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Tooltip } from 'antd';
import useSWR from 'swr';
import axios from 'axios';
import css from './ModerationEmail.module.css';

const ModerationEmail = () => {
    const fetcher = url => axios.get(url).then(res => res.data);
    const url = `${process.env.REACT_APP_BASE_API_URL}/api/admin/email/`;
    const { data, mutate } = useSWR(url, fetcher);

    // Define email and setEmail using useState
    const [email, setEmail] = useState(null);
    const [error, setError] = useState(null);

    // Update email state when data is fetched
    useEffect(() => {
        if (data && data.email_moderation && email === null) {
            setEmail(data.email_moderation);
        }
    }, [data]);

    const handleInputChange = (e) => {
        let value = e.target.value;
        setError(null);
        setEmail(value);
    };

    const handleSubmit = () => {
        !error && axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/admin/email/`, { 'email_moderation': email })
            .then(() => {
                toast.success('Зміни успішно застосовано.');
                mutate({ ...data, email_moderation: email });
            })
            .catch(() => toast.error('Eлектронна пошта вказана невірно.'));
    };

    return (
        <div className={css['moderation_email-section']}>
            <Tooltip
                title={'Введіть Email'}
                placement="top"
                pointAtCenter={true}>
                <input className={css['moderation_email-input']} type="email" onChange={handleInputChange} value={email || ''} />
            </Tooltip>
            {error &&
                <p className={css['error-message']}>{error}</p>}
            <button className={css['save-button']} onClick={handleSubmit}>Змінити</button>
        </div>
    );

};

export default ModerationEmail;