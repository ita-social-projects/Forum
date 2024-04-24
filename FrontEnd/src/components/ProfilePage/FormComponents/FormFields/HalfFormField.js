import {PropTypes} from 'prop-types';
import css from './HalfFormField.module.css';
import {Tooltip} from 'antd';

const LengthEmail = 32;

const HalfFormField = (props) => {
    const shouldShowTooltip = props.name === 'email' && props.value.length > LengthEmail;

    const truncatedEmail = shouldShowTooltip ? `${props.value.slice(0, LengthEmail)}...` : props.value;

    return (
        <div className={css['fields__column']}>
            <div className={css['fields__label']}>
                {props.requredField && <label className={css['fields__label--required']}>*</label>}
                <label
                    className={`${css['fields__label--text']} ${!props.requredField && css['fields__field--notrequired']}`}
                >
                    {props.label}
                </label>
            </div>
            <div className={css['fields__field']}>
                {shouldShowTooltip ? (
                    <Tooltip title={props.value} placement="bottom">
                        <input
                            type={props.inputType || 'text'}
                            className={`${css['fields__field--input']} ${props.name === 'email' && css['disabled__field']}`}
                            name={props.name}
                            value={truncatedEmail}
                            placeholder={props.fieldPlaceholder || 'Введіть текст'}
                            onChange={props.updateHandler}
                            required={props.requredField ? 'required' : ''}
                            disabled={props.name === 'email' ? 'disabled' : ''}
                            maxLength={props.maxLength}
                        />
                    </Tooltip>
                ) : (
                    <input
                        type={props.inputType || 'text'}
                        className={`${css['fields__field--input']} ${props.name === 'email' && css['disabled__field']}`}
                        name={props.name}
                        value={truncatedEmail}
                        placeholder={props.fieldPlaceholder || 'Введіть текст'}
                        onChange={props.updateHandler}
                        required={props.requredField ? 'required' : ''}
                        disabled={props.name === 'email' ? 'disabled' : ''}
                        maxLength={props.maxLength}
                    />
                )}
            </div>
            {(props.requredField || props.error) &&
                <div className={css['error-message']}>
                    {props.error}
                </div>
            }
        </div>
    );
};

export default HalfFormField;

HalfFormField.propTypes = {
    requredField: PropTypes.bool,
    inputType: PropTypes.string,
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    fieldPlaceholder: PropTypes.string,
    maxLength: PropTypes.number,
    updateHandler: PropTypes.func,
    error: PropTypes.string,
};