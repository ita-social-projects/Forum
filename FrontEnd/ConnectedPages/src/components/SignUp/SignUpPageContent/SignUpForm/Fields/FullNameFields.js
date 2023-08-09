import css from './FullNameFields.module.css'

function FullNameFieldsComponent(props) {
    const errorMessageSurname = props.errorSurname;
    const errorMessageName = props.errorName;
    return (
        <div className={css['fullname-fields']}>
            <div className={css['fullname-fields__column']}>
                <div className={css['fullname-fields__label']}>
                    <label className={css['fullname-fields__label--required']}>*</label>
                    <label className={css['fullname-fields__label--text']}>Прізвище</label>
                </div>
                <div className={css['fullname-fields__field']}>
                    <input
                        className={css['fullname-fields__field--input']}
                        name='surname'
                        // value={props.value__surname}
                        placeholder='Прізвище'
                        onChange={props.surnameChangeHandler}
                        required
                    />
                </div>
                <div className={css['error-message']}>
                    {errorMessageSurname}
                </div>
            </div>
            <div className={css['fullname-fields__column']}>
                <div className={css['fullname-fields__label']}>
                    <label className={css['fullname-fields__label--required']}>*</label>
                    <label className={css['fullname-fields__label--text']}>Ім‘я</label>
                </div>
                <div className={css['fullname-fields__field']}>
                    <input
                        className={css['fullname-fields__field--input']}
                        name='name'
                        
                        placeholder='Ім‘я'
                        onChange={props.nameChangeHandler}
                        required
                    />
                </div>
                <div className={css['error-message']}>
                    {errorMessageName}
                </div>
            </div>
        </div>
    );
}

export default FullNameFieldsComponent;