import styles from './SignUpForm.module.css'
import SignUpFormContentComponent from './signup-form/SignUpFormContent';


export function SignUpFormComponent() {
    return <div className={styles['form__container']}>
        <div className={styles['form__header']}>Реєстрація</div>
        <SignUpFormContentComponent/>
        <div className={styles['form__footer']}>
            <div className={styles['button-container']}>
                <button className={styles['main-page__button']} type='button'>Головна</button>
                <button
                    form='signUpForm'
                    className={styles['sign-up__button']}
                    type='submit'
                >Зареєструватися</button>
            </div>
        </div>
    </div>
}