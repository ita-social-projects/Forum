import { PropTypes } from 'prop-types';
import preventEnterSubmit from '../../../../utils/preventEnterSubmit';
import css from './TextField.module.css';

const TextField = (props) => {
  return (
    <div className={css['fields__column']}>
      <div className={css['fields__label']}>
        {props.requiredField && (
          <label className={css['fields__label--required']}>*</label>
        )}
        <label
          className={`${css['fields__label--text']} ${
            !props.requiredField && css['fields__field--notrequired']
          }`}
        >
          {props.label}
        </label>
      </div>
      <div className={css['fields__field']}>
        <textarea
          className={css['fields__field--textarea']}
          name={props.name}
          value={props.value}
          placeholder={
            props.fieldPlaceholder ? props.fieldPlaceholder : 'Введіть текст'
          }
          onChange={props.updateHandler}
          onKeyDown={preventEnterSubmit}
          required={props.requiredField ? 'required' : ''}
          disabled={props.name === 'email' ? 'disabled' : ''}
          onBlur={props.onBlur}
        ></textarea>
      </div>
      <div className={css['count__symbols']}>
        {props.value.length} / {props.maxLength}
      </div>
      {props.requiredField && (
        <div className={css['error-message']}>{props.error}</div>
      )}
    </div>
  );
};

export default TextField;

TextField.propTypes = {
  requiredField: PropTypes.bool,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  fieldPlaceholder: PropTypes.string,
  maxLength: PropTypes.number,
  updateHandler: PropTypes.func,
  error: PropTypes.string,
  onBlur: PropTypes.func,
};