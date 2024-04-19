import { useState } from 'react';
import { PropTypes } from 'prop-types';
import EyeInvisible from '../../../authorization/EyeInvisible';
import EyeVisible from '../../../authorization/EyeVisible';
import css from './PasswordField.module.css';
import { PASSWORD_PATTERN } from '../../../../constants/constants';

const PasswordField = (props) => {

    const errorMessages = {
        invalidPassword: 'Пароль не відповідає вимогам',
        passwordsDontMatch: 'Паролі не співпадають'
    };

    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const {
        register,
        name,
        error,
        showError,
        watch,
        label,
        inputId,
        checkValid,
        checkMatch
    } = props;

    return (
        <div className={css['password-field__item']}>
            <div className={css['password-field__label-wrapper']}>
                <span>
                    *
                </span>
                <label
                    htmlFor={inputId}
                >
                    {label}
                </label>
            </div>
            <div className={css['password-field__password']}>
                <div className={css['password-field__password__wrapper']}>
                    <input
                        id={inputId}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={label}
                        {...register(name,
                            {
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
            {(error[name] && showError) ?
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
    showError: PropTypes.bool.isRequired,
    error: PropTypes.object,
    checkValid: PropTypes.bool.isRequired,
    checkMatch: PropTypes.shape({
        isCheck: PropTypes.bool.isRequired,
        checkWith: PropTypes.string
    })
};

export default PasswordField;