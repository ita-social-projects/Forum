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
                    <input
                        className={css['checkbox__input']}
                        name={props.nameRegister}
                        type="checkbox"
                        value={props.nameRegister}
                        onChange={props.updateHandler}
                        checked={props.valueRegister}
                    />
                    Зареєстрована компанія
                </label>
            </div>
            <div className={css['representative__checkboxes--company-type']}>
                <label className={css['form-control']}>
                    <input
                        className={css['checkbox__input']}
                        name={props.nameStartup}
                        type="checkbox"
                        value={props.nameStartup}
                        onChange={props.updateHandler}
                        checked={props.valueStartup}
                    />
                    Стартап проект, який шукає інвестиції
                </label>
            </div>
        </div>
    </div>);
};

export default CheckBoxField;
