import css from './Modal.module.css'
import SignUpFormComponent from '../SignUpPageContent/SignUpForm/SignUpForm';
import SignInLineComponent from '../SignUpPageContent/SignInLine';

function ModalComponent() {
    return <div className={css.modal}>
        <SignUpFormComponent />
        <SignInLineComponent />
    </div>
}

export default ModalComponent;