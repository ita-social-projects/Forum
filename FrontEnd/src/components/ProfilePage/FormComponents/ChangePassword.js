import axios from 'axios';
import { PropTypes } from 'prop-types';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { DirtyFormContext } from '../../../context/DirtyFormContext';
import PasswordField from './FormFields/PasswordField';
import Loader from '../../loader/Loader';
import css from './ChangePassword.module.css';
import { PASSWORD_PATTERN } from '../../../constants/constants';


export default function ChangePassword(props) {
    const [formData, setFormData] = useState({ currentPassword: '', newPassword: '', reNewPassword: '' });
    const [passwordsDontMatchError, setPasswordsDontMatchError] = useState(null);
    const [invalidPasswordError, setInvalidPasswordError] = useState(null);
    const { setFormIsDirty } = useContext(DirtyFormContext);
    const { currentFormNameHandler, curForm } = props;

    useEffect(() => {
      currentFormNameHandler(curForm);
    }, [currentFormNameHandler, curForm]);

    useEffect(() => {
        setFormIsDirty(Object.keys(formData).some((field) => formData[field] !== ''));
    }, [formData]
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!invalidPasswordError && !passwordsDontMatchError) {
            axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/auth/users/set_password/`, {
                current_password: formData.currentPassword,
                new_password: formData.newPassword,
                re_new_password: formData.reNewPassword
            })
                .then(() => toast.success('Пароль успішно змінено'))
                .catch(() => toast.error('Виникла помилка. Можливо, вказано невірний поточний пароль'));
            setFormData({ currentPassword: '', newPassword: '', reNewPassword: '' });
        }
    };

    const handleInputChange = (e) => {
        e.preventDefault();
        const updatedFormData = { ...formData, [e.target.name]: e.target.value };
        setFormData(updatedFormData);
        (updatedFormData.newPassword !== '' &&
        !PASSWORD_PATTERN.test(updatedFormData.newPassword)) ?
            setInvalidPasswordError('Пароль не відповідає вимогам') :
            setInvalidPasswordError(null);
        (updatedFormData.reNewPassword !== '' &&
        updatedFormData.newPassword !== updatedFormData.reNewPassword) ?
            setPasswordsDontMatchError('Паролі не співпадають') :
            setPasswordsDontMatchError(null);
    };

    return (
        <div className={css['form__container']}>
            {props.user
                ?
                <form id="ChangePassword" onSubmit={handleSubmit}>
                    <PasswordField
                        name="currentPassword"
                        label="Поточний пароль"
                        updateHandler={handleInputChange}
                        value={formData.currentPassword}
                        requiredField={true}
                    />
                    <PasswordField
                        name="newPassword"
                        label="Новий пароль"
                        updateHandler={handleInputChange}
                        value={formData.newPassword}
                        requiredField={true}
                        error={invalidPasswordError}
                    />
                    <PasswordField
                        name="reNewPassword"
                        label="Повторіть новий пароль"
                        updateHandler={handleInputChange}
                        value={formData.reNewPassword}
                        requiredField={true}
                        error={passwordsDontMatchError}
                    />
                </form>
                : <Loader />
            }
        </div>
    );
}

ChangePassword.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        profile_id: PropTypes.number.isRequired,
        is_staff: PropTypes.bool.isRequired
    }).isRequired,
    currentFormNameHandler: PropTypes.func.isRequired,
    curForm: PropTypes.string.isRequired
};


