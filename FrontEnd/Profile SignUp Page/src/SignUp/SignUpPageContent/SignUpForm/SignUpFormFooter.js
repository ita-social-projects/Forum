import css from './SignUpFormFooter.module.css'

function SignUpFormFooterComponent(props) {
    return (<div className={css['sign-up-footer']}>
        <div className={css['sign-up-footer__buttons']}>
            <button className={css['main-page__button']} type='button'>Головна</button>
            <button
                form='signUpForm'
                className={css['sign-up__button']}
                type='submit'
                onClick={props.submitHandler}
            >Зареєструватися</button>
        </div>
    </div>)
}

export default SignUpFormFooterComponent;