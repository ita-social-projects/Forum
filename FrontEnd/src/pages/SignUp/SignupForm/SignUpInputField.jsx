import PropTypes from 'prop-types';
import { Tooltip } from 'antd';
import classNames from 'classnames';

import styles from './SignUpFormContent.module.css';

const SignUpInputField = ({
    name,
    type,
    label,
    placeholder,
    register,
    validation,
    maxLength,
    tooltip,
    tooltipTrigger,
    error,
    onBlur,
  }) => {

    return (
        <div className={styles['signup-form__item']}>
            <div className={styles['signup-form__label']}>
                <label className={styles['signup-form__label--required']}>*</label>
                <label className={styles['signup-form__label--text']}>{label}</label>
            </div>
            <div className={styles['signup-form__field']}>
                <Tooltip title={tooltip} trigger={tooltipTrigger} pointAtCenter>
                    <input
                        type={type}
                        {...register(name, validation)}
                        className={classNames(styles['signup-form__input'], {
                            [styles['signup-form__input--error']]: error,
                        })}
                        placeholder={placeholder}
                        maxLength={maxLength}
                        onBlur={onBlur}
                    />
                </Tooltip>
            </div>
            {error && <p className={styles['signup-form__error']}>{error.message}</p>}
        </div>
    );
};

SignUpInputField.propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    validation: PropTypes.object,
    maxLength: PropTypes.number,
    tooltip: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    error: PropTypes.object,
    register: PropTypes.func.isRequired,
    onBlur: PropTypes.func,
  };

export default SignUpInputField;