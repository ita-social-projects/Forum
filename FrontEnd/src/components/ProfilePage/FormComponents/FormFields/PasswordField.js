import { useState } from 'react';
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
                {props.requredField &&
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
                        required={props.requredField}
                    />
                </div>
                <span
                    className={css['password-visibility']}
                    onClick={togglePassword}
                >
                    {!showPassword ? <EyeInvisible /> : <EyeVisible />}
                </span>
            </div>
            {(props.requredField || props.error) &&
                <div className={css['error-message']}>
                    {props.error}
                </div>
            }
        </div>
    );
};

export default PasswordField;