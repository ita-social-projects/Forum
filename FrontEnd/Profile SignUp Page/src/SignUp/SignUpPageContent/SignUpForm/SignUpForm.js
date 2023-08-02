import css from './SignUpForm.module.css'
import SignUpFormHeaderComponent from './SignUpFormHeader';
import SignUpFormContentComponent from './SignUpFormContent';
import SignUpFormFooterComponent from './SignUpFormFooter';


function SignUpFormComponent() {
    return <div className={css['form-block']}>
        <SignUpFormHeaderComponent />
        <SignUpFormContentComponent />
        <SignUpFormFooterComponent />
    </div>
}

export default SignUpFormComponent;