import css from './SignUpPage.module.css'
import DotDecorComponent from './UI/DotDecor';
import ModalComponent from './UI/Modal';

function SignUpPageComponent() {
    return <div className={css['sign-up']}>
        <div className={css['sign-up__body']}>
            <DotDecorComponent position={"up-right"} />
            <ModalComponent />
            <DotDecorComponent position={"down-left"} />
        </div>
    </div>
}

export default SignUpPageComponent;