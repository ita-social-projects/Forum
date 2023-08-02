import css from './SignUpFormContent.module.css'
import { useState } from 'react';
import EmailFieldComponent from './Fields/EmailField';
import PasswordFieldsComponent from './Fields/PasswordFields';
import FullNameFieldsComponent from './Fields/FullNameFields';
import CompanyFieldsComponent from './Fields/CompanyFields';
import BottomCheckboxesComponent from './Fields/BottomCheckboxes';


function SignUpFormContentComponent() {

    const [formContent, setFormContent] = useState({
        'email': '',
        'password': '',
        'confirmPassword': '',
        'surname': '',
        'name': '',
        'companyName': '',
        'companyCheckbox': false,
        'startupCheckbox': false,
        'rulesAgreement': false
    });

    const [formState, setFormState] = useState({
        email: {
            'error': false,
            'message': ''
        },
        password: {
            'error': false,
            'message': ''
        },
        confirmPassword: {
            'error': false,
            'message': ''
        },
        surname: {
            'error': false,
            'message': ''
        },
        name: {
            'error': false,
            'message': ''
        },
        companyName: {
            'error': false,
            'message': ''
        },
    });

    const checkRequiredFields = (formData) => {
        const newFormState = {};
        for (const key in formData) {
            if (!formData[key]) {
                newFormState[key] = {
                    'error': true,
                    'message': 'Обов’язкове поле',
                }
            } else {
                newFormState[key] = {
                    'error': false,
                    'message': '',
                }
            }
        }
        const nextFormState = {
            ...formState,
            ...newFormState,
        }

        setFormState(nextFormState);

    }


    const onUpdateField = e => {
        const nextFormState = {
            ...formContent,
            [e.target.name]: e.target.value
        };
        setFormContent(nextFormState);
        console.log(formContent);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        checkRequiredFields(formContent);
        console.log("submitted");

    }


    return (<div className={css['signup-form']}>
        <form id='signUpForm' className={css['signup-form__body']} onSubmit={handleSubmit} autoComplete='off' noValidate>
            <EmailFieldComponent
                emailChangeHandler={onUpdateField}
                error={formState['email']['error'] ? formState['email']['message'] : null}
            />
            <PasswordFieldsComponent
                passwordChangeHandler={onUpdateField}
                confirmPasswordChangeHandler={onUpdateField}
                errorPassword={formState['password']['error'] ? formState['password']['message'] : null}
                errorConfirmPassword={formState['confirmPassword']['error'] ? formState['confirmPassword']['message'] : null}
            />
            <FullNameFieldsComponent
                surnameChangeHandler={onUpdateField}
                nameChangeHandler={onUpdateField}
                errorSurname={formState['surname']['error'] ? formState['surname']['message'] : null}
                errorName={formState['name']['error'] ? formState['name']['message'] : null}
            />
            <CompanyFieldsComponent
                companyNameChangeHandler={onUpdateField}
                error={formState['companyName']['error'] ? formState['companyName']['message'] : null}
            />
            <BottomCheckboxesComponent />
        </form>
    </div>

    );
}
export default SignUpFormContentComponent;