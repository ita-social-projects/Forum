import preventEnterSubmit from '../../../../utils/preventEnterSubmit';
import css from './FullField.module.css';

const FullField = (props) => {
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
        <input
          type={props.inputType ? props.inputType : 'text'}
          className={css['fields__field--input']}
          name={props.name}
          value={props.value}
          placeholder={
            props.fieldPlaceholder ? props.fieldPlaceholder : 'Введіть текст'
          }
          onChange={props.updateHandler}
          onBlur={props.onBlur}
          onKeyDown={preventEnterSubmit}
          required={props.requiredField ? 'required' : ''}
          disabled={props.name === 'email' ? 'disabled' : ''}
          maxLength={props.maxLength}
        />
      </div>
      {(props.requiredField || props.error) && (
        <div className={css['error-message']}>{props.error}</div>
      )}
    </div>
  );
};

export default FullField;
