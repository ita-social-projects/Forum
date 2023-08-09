import css from './SignInLine.module.css'

function SignInLineComponent() {
    return <div className={css['sign-in-line']}>
        <div className={css['sign-in-line__message']}>Вже були на нашому сайті?</div>
        <a href='#' className={css['sign-in-line__link']}>Увійти</a>
        </div>
}

export default SignInLineComponent;