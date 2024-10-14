import axios from 'axios';
import { toast } from 'react-toastify';
import { Tooltip } from 'antd';
import { useState } from 'react';
import { EMAIL_PATTERN } from '../../../constants/constants';
import css from './AdminRegistration.module.css';

const AdminRegistration = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        setEmail(e.target.value);
    };

    const url = `${process.env.REACT_APP_BASE_API_URL}/api/admin/admin_create/`;

    const handleSubmit = () => {
        EMAIL_PATTERN.test(email) ?
            axios.post(url, { email: email })
                .then(() => {
                    toast.success('Пароль надіслано на електронну адресу');
                })
                .catch((err) => {
                    if (err.response.data.email) {
                        toast.error('Ця електронна пошта вже використовується');
                    } else {
                        toast.error('Виникла помилка');
                    }
                })
                .finally(() => {
                    setError(null);
                })
            :
            setError('Будь ласка, введіть дійсну електронну адресу');
    };

    return (
        <div className={css['admin_registration-section']}>
            <h3>Реєстрація Адміністратора</h3>
            <div className={css['admin_registration-outer-wrapper']}>
                <label className={css['admin_registration-label']} htmlFor="newAdminEmail">
                    <span className={css['admin_registration-asterisk']} >*</span>
                    Електронна адреса
                </label>
                <div className={css['admin_registration-input-wrapper']}>
                    <Tooltip
                        title={'Введіть тут електронну пошту особи, яку потрібно зареєструвати в якості адміністратора'}
                        placement="top">
                        <input className={css['admin_registration-input']}
                            id="newAdminEmail"
                            onChange={handleInputChange}
                            type="text"
                            placeholder="Введіть текст"
                            autoComplete="email" />
                    </Tooltip>
                    <button className={css['admin_registration-button']} onClick={handleSubmit}>
                        Згенерувати та надіслати пароль
                    </button>
                </div>
                {error && <p className={css['admin_registration-error']} >{error}</p>}
            </div>
        </div>
    );
};

export default AdminRegistration;