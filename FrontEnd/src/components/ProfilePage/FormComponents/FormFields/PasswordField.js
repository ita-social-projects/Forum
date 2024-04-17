import { useState } from 'react';
import { PropTypes } from 'prop-types';
import EyeInvisible from '../../../authorization/EyeInvisible';
import EyeVisible from '../../../authorization/EyeVisible';
import css from './PasswordField.module.css';

const PasswordField = (props) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={css['password-field__item']}>
            <div className={css['password-field__label-wrapper']}>
                {props.requiredField &&
                <span>
                    *
                </span>}
                <label
                    htmlFor={props.inputId}
                >
                    {props.label}
                </label>
            </div>
            <div className={css['password-field__password']}>
                <div className={css['password-field__password__wrapper']}>
                    <input
                        id={props.inputId}
                        name={props.name}
                        type={showPassword ? 'text' : 'password'}
                        value={props.value}
                        onChange={props.updateHandler}
                        placeholder={props.label}
                        required={props.requiredField}
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
            {(props.requiredField && props.error) &&
                <div className={css['error-message']}>
                    {props.error}
                </div>
            }
        </div>
    );
};

PasswordField.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    updateHandler: PropTypes.func.isRequired,
    value: PropTypes.string,
    inputId: PropTypes.string,
    requiredField: PropTypes.bool,
    error: PropTypes.string
};

export default PasswordField;