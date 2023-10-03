import css from './TextField.module.css';

const TextField = (props) => {
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
                <textarea
                    className={css['fields__field--textarea']}
                    name={props.name}
                    value={props.value}
                    placeholder={props.fieldPlaceholder ? props.fieldPlaceholder : 'Введіть текст'}
                    onChange={props.updateHandler}
                    required={(props.requredField) ? 'required' : ''}
                    disabled={(props.name === 'email') ? 'disabled' : ''}
                ></textarea>
            </div>
            <div className={css['count__symbols']}>
                {props.value.length} / {props.maxLength}
            </div>
            {props.requredField &&
                <div className={css['error-message']}>
                    {props.error}
                </div>
            }
        </div>
    );
};

export default TextField;
