import { PropTypes } from 'prop-types';
import { Checkbox } from 'antd';
import preventEnterSubmit from '../../../../utils/preventEnterSubmit';
import css from './CheckBoxField.module.css';

const CheckBoxField = (props) => {
  return (
    <div className={css['representative']}>
      <div className={css['representative__label']}>
        {props.requiredField && (
          <span className={css['representative__label--required']}>*</span>
        )}
        <label
          htmlFor={props.nameRegister}
          className={`${css['representative__label--text']} ${
            !props.requiredField && css['fields__field--notrequired']
          }`}
        >
          Кого ви представляєте?
        </label>
      </div>
      <div className={css['representative__checkboxes']}>
        <div className={css['representative__checkboxes--company-type']}>
          <label className={css['form-control']}>
            <Checkbox
              id={props.nameRegister}
              name={props.nameRegister}
              onChange={props.updateHandler}
              onKeyDown={preventEnterSubmit}
              checked={props.valueRegister}
            />
            Зареєстрована компанія
          </label>
        </div>
        <div className={css['representative__checkboxes--company-type']}>
          <label className={css['form-control']}>
            <Checkbox
              name={props.nameStartup}
              onChange={props.updateHandler}
              onKeyDown={preventEnterSubmit}
              checked={props.valueStartup}
            />
            Стартап проект, який шукає інвестиції
          </label>
        </div>
      </div>
      {(props.requiredField || props.error) && (
        <span className={css['error-message']}>{props.error}</span>
      )}
    </div>
  );
};

export default CheckBoxField;

CheckBoxField.propTypes = {
  requiredField: PropTypes.bool.isRequired,
  nameRegister: PropTypes.string.isRequired,
  valueRegister: PropTypes.bool.isRequired,
  nameStartup: PropTypes.string.isRequired,
  valueStartup: PropTypes.bool.isRequired,
  updateHandler: PropTypes.func.isRequired,
  error: PropTypes.string,
};
