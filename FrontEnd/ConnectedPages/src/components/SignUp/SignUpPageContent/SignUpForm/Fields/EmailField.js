import css from './EmailField.module.css'

function EmailFieldComponent(props) {
    const errorMessage = props.error;

    return (
        <div className={css['email-field']}>
            <div className={css['email-field__label']}>
                <label className={css['email-field__label--required']}>*</label>
                <label className={css['email-field__label--text']}>Електронна пошта </label>
            </div>
            <div className={css['email-field__field']}>
                <input
                    className={css['email-field__field--input']}
                    name='email'
                    placeholder='Електронна пошта'
                    onChange={props.emailChangeHandler}
                    required
                />

            </div>
            <div className={css['error-message']}>
                {errorMessage}
            </div>
        </div>
    );
}

export default EmailFieldComponent;