import { useState } from 'react';
import { PropTypes } from 'prop-types';
import EyeInvisible from '../../../authorization/EyeInvisible';
import EyeVisible from '../../../authorization/EyeVisible';
<<<<<<< HEAD
=======
import preventEnterSubmit from '../../../../utils/preventEnterSubmit';
>>>>>>> ac5ea621aa794a14997aac3ce734764d3e48eea6
import css from './PasswordField.module.css';
import { PASSWORD_PATTERN } from '../../../../constants/constants';

const PasswordField = (props) => {

    const errorMessages = {
        invalidPassword: 'Пароль не відповідає вимогам',
<<<<<<< HEAD
        passwordsDontMatch: 'Паролі не співпадають'
=======
        passwordsDontMatch: 'Паролі не співпадають',
        requiredField: 'Обов’язкове поле'
>>>>>>> ac5ea621aa794a14997aac3ce734764d3e48eea6
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const {
        register,
        name,
        error,
<<<<<<< HEAD
        showError,
=======
>>>>>>> ac5ea621aa794a14997aac3ce734764d3e48eea6
        watch,
        label,
        inputId,
        checkValid,
        checkMatch
    } = props;

    return (
        <div className={css['password-field__item']}>
            <div className={css['password-field__label-wrapper']}>
<<<<<<< HEAD
                <span>
                    *
                </span>
                <label
=======
                <label className={error[name] ? css['error-dot'] : ''}
>>>>>>> ac5ea621aa794a14997aac3ce734764d3e48eea6
                    htmlFor={inputId}
                >
                    {label}
                </label>
            </div>
            <div className={css['password-field__password']}>
                <div className={css['password-field__password__wrapper']}>
                    <input
<<<<<<< HEAD
=======
                        onKeyDown={preventEnterSubmit}
>>>>>>> ac5ea621aa794a14997aac3ce734764d3e48eea6
                        id={inputId}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={label}
                        required
                        {...register(name,
                            {
<<<<<<< HEAD
=======
                                required: errorMessages.requiredField,
>>>>>>> ac5ea621aa794a14997aac3ce734764d3e48eea6
                                pattern: checkValid && {
                                    value: PASSWORD_PATTERN,
                                    message: errorMessages.invalidPassword
                                },
                                validate: checkMatch.isCheck ?
                                    (value) => {
                                        return value === watch(checkMatch.checkWith) ||
                                            value === '' ||
                                            errorMessages.passwordsDontMatch;
                                    } :
                                    null
                            })}
                    />
                </div>
                <span
                    aria-label="Toggle password visibility"
                    className={css['password-visibility']}
                    onClick={togglePassword}
                >
                    {!showPassword ? <EyeInvisible /> : <EyeVisible />}
                </span>
            </div>
<<<<<<< HEAD
            {(error[name] && showError) ?
=======
            {(error[name]) ?
>>>>>>> ac5ea621aa794a14997aac3ce734764d3e48eea6
                <div className={css['error-message']}>
                    {error[name].message}
                </div>
                :
                null
            }
        </div>
    );
};

PasswordField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    watch: PropTypes.func.isRequired,
    inputId: PropTypes.string.isRequired,
<<<<<<< HEAD
    showError: PropTypes.bool.isRequired,
=======
>>>>>>> ac5ea621aa794a14997aac3ce734764d3e48eea6
    error: PropTypes.object,
    checkValid: PropTypes.bool.isRequired,
    checkMatch: PropTypes.shape({
        isCheck: PropTypes.bool.isRequired,
        checkWith: PropTypes.string
    })
};

export default PasswordField;