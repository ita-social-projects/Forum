import { PropTypes } from 'prop-types';
import css from './HalfFormField.module.css';

const HalfFormField = (props) => {

    const onKeyDown = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
        }
    };

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
                <input
                    type={props.inputType ? props.inputType : 'text'}
                    className={`${css['fields__field--input']} ${props.name === 'email' && css['disabled__field']}`}
                    name={props.name}
                    value={props.value}
                    placeholder={props.fieldPlaceholder ? props.fieldPlaceholder : 'Введіть текст'}
                    onKeyDown={onKeyDown}
                    onChange={props.updateHandler}
                    required={(props.requredField) ? 'required' : ''}
                    disabled={(props.name === 'email') ? 'disabled' : ''}
                    maxLength={props.maxLength}
                />
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
    error:PropTypes.string,
  };