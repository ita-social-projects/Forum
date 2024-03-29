import { PropTypes } from 'prop-types';
import { Checkbox } from 'antd';
import css from './CheckBoxField.module.css';

const CheckBoxField = (props) => {
    return (<div className={css['representative']}>
        <div className={css['representative__label']}>
            {props.requredField && <label className={css['representative__label--required']}>*</label>}
            <label
                className={`${css['representative__label--text']} ${!props.requredField && css['fields__field--notrequired']}`}
            >
                Кого ви представляєте?
            </label>
        </div>
        <div className={css['representative__checkboxes']}>
            <div className={css['representative__checkboxes--company-type']}>
                <label className={css['form-control']}>
                    <Checkbox
                        name={props.nameRegister}
                        onChange={props.updateHandler}
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
                        checked={props.valueStartup}
                    />
                    Стартап проект, який шукає інвестиції
                </label>
            </div>
        </div>
        {(props.requredField || props.error) &&
            <span className={css['error-message']}>
                {props.error}
            </span>
            }
    </div>);
};

export default CheckBoxField;

CheckBoxField.propTypes = {
    requredField: PropTypes.bool.isRequired,
    nameRegister: PropTypes.string.isRequired,
    valueRegister: PropTypes.bool.isRequired,
    nameStartup: PropTypes.string.isRequired,
    valueStartup: PropTypes.bool.isRequired,
    updateHandler: PropTypes.func.isRequired,
    error:PropTypes.string,
  };