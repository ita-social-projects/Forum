import css from './PasswordFields.module.css'

function PasswordFieldsComponent(props) {
    const errorMessagePassword = props.errorPassword;
    const errorMessageConfirmPassword = props.errorConfirmPassword;

    return (
        <div className={css['password-fields']}>
            <div className={css['password-fields__column']}>
                <div className={css['password-fields__label']}>
                    <label className={css['password-fields__label--required']}>*</label>
                    <div className={css['password-fields__label--text']}>
                        <label className={css['password-fields__label--text--title']}>Пароль</label>
                        <label className={css['password-fields__label--text--hint']}>(Повинен містити A-Z, a-z, 0-9)</label>
                    </div>
                </div>
                <div className={css['password-fields__field']}>
                    <input
                        className={css['password-fields__field--input']}
                        name='password'
                        placeholder='Пароль'
                        onChange={props.passwordChangeHandler}
                        required
                    />
                </div>
                <div className={css['error-message']}>
                    {errorMessagePassword}
                </div>
            </div>
            <div className={css['password-fields__column']}>
                <div className={css['password-fields__label']}>
                    <label className={css['password-fields__label--required']}>*</label>
                    <div className={css['password-fields__label--text']}>
                        <label className={css['password-fields__label--text--title']}>Повторіть пароль</label>
                        <label className={css['password-fields__label--text--hint']}>(Повинен містити A-Z, a-z, 0-9)</label>
                    </div>
                </div>
                <div className={css['password-fields__field']}>
                    <input
                        className={css['password-fields__field--input']}
                        placeholder='Пароль'
                        name='confirmPassword'
                        onChange={props.confirmPasswordChangeHandler}
                        required
                    />
                </div>
                <div className={css['error-message']}>
                    {errorMessageConfirmPassword}
            </div>
            </div>
            
        </div>
    );
}

export default PasswordFieldsComponent;