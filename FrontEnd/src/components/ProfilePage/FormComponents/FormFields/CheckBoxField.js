import { PropTypes } from 'prop-types';
import { Checkbox } from 'antd';
import css from './CheckBoxField.module.css';

const CheckBoxField = ({fopProps, companyProps}) => {
    return (fopProps && fopProps.fop_field ? (
        <div className={`${css['representative__checkboxes']} ${css['fop-field']}`}>
            <Checkbox
                name={fopProps.name}
                onChange={fopProps.updateHandler}
                checked={fopProps.value}
            />
            <label className={css['form-control']}>
                ФОП
            </label>
        </div>
        ) : (
        <div className={css['representative']}>
            <div className={css['representative__label']}>
                {companyProps.requredField && <label className={css['representative__label--required']}>*</label>}
                <label
                    className={`${css['representative__label--text']} ${!companyProps.requredField && css['fields__field--notrequired']}`}
                >
                    Кого ви представляєте?
                </label>
            </div>
            <div className={css['representative__checkboxes']}>
                <div className={css['representative__checkboxes--company-type']}>
                    <label className={css['form-control']}>
                        <Checkbox
                            name={companyProps.nameRegister}
                            onChange={companyProps.updateHandler}
                            checked={companyProps.valueRegister}
                        />
                        Зареєстрована компанія
                    </label>
                </div>
                <div className={css['representative__checkboxes--company-type']}>
                    <label className={css['form-control']}>
                        <Checkbox
                            name={companyProps.nameStartup}
                            onChange={companyProps.updateHandler}
                            checked={companyProps.valueStartup}
                        />
                        Стартап проект, який шукає інвестиції
                    </label>
                </div>
            </div>
            {(companyProps.requredField || companyProps.error) &&
                <span className={css['error-message']}>
                    {companyProps.error}
                </span>
                }
        </div>
        )
    );
};

export default CheckBoxField;

CheckBoxField.propTypes = {
    fopProps: PropTypes.shape({
        fop_field:PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
        value: PropTypes.bool.isRequired,
        updateHandler: PropTypes.func.isRequired,
    }),
    companyProps: PropTypes.shape({
        requredField: PropTypes.bool.isRequired,
        nameRegister: PropTypes.string.isRequired,
        valueRegister: PropTypes.bool.isRequired,
        nameStartup: PropTypes.string.isRequired,
        valueStartup: PropTypes.bool.isRequired,
        updateHandler: PropTypes.func.isRequired,
        error:PropTypes.string,
    })
  };