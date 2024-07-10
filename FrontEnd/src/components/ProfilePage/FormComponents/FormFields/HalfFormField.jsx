import { PropTypes } from 'prop-types';
import preventEnterSubmit from '../../../../utils/preventEnterSubmit';
import css from './HalfFormField.module.css';
import { Tooltip } from 'antd';
import { useMask } from '@react-input/mask';

const LENGTH_EMAIL = 19;

const HalfFormField = (props) => {

  const inputRef = useMask({ mask: '+380XX XXX XX XX', replacement: { X: /\d/ } });

  const shouldShowTooltip =
    props.name === 'email' && props.value.length > LENGTH_EMAIL;

  const fieldValue = shouldShowTooltip
    ? `${props.value.slice(0, LENGTH_EMAIL)}...`
    : props.value;

  return (
    <div className={css['fields__column']}>
      <div className={css['fields__label']}>
        {props.requredField && (
          <label className={css['fields__label--required']}>*</label>
        )}
        <label
          className={`${css['fields__label--text']} ${
            !props.requredField && css['fields__field--notrequired']
          }`}
        >
          {props.label}
        </label>
      </div>
      <div className={css['fields__field']}>
        <Tooltip
          title={shouldShowTooltip ? props.value : ''}
          placement="bottom"
        >
          <input
            type={props.inputType || 'text'}
            className={`${css['fields__field--input']} ${
              props.name === 'email' && css['disabled__field']
            }`}
            name={props.name}
            value={fieldValue}
            placeholder={props.fieldPlaceholder || 'Введіть текст'}
            onBlur={props.onBlur}
            onKeyDown={preventEnterSubmit}
            onChange={props.updateHandler}
            ref={inputRef}
            required={props.requredField ? 'required' : ''}
            disabled={props.name === 'email' ? 'disabled' : ''}
            maxLength={props.maxLength}
          />
        </Tooltip>
      </div>
      {(props.requredField || props.error) && (
        <div className={css['error-message']}>
          {Array.isArray(props.error) ? (
            props.error.map((error, index) => <span key={index}>{error}</span>)
          ) : (
            <span>{props.error}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default HalfFormField;

HalfFormField.propTypes = {
  requredField: PropTypes.bool,
  inputType: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  fieldPlaceholder: PropTypes.string,
  maxLength: PropTypes.number,
  updateHandler: PropTypes.func,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
};
