import css from './FormComponents.module.css';
import HalfFormField from './FormFields/HalfFormField';
import { useState, useEffect } from 'react';

const LABELS = {
    'surname': 'Прізвище',
    'name': 'Ім‘я',
    'person_position': 'Посада в компанії чи стартапі',
    'email': 'Електронна пошта',
};

const ERRORS = {
    surname: {
        'error': false,
        'message': ''
    },
    name: {
        'error': false,
        'message': ''
    },
};

const UserInfo = (props) => {
    const [user, setUser] = useState(props.user);
    const [profile, setProfile] = useState(props.profile);
    const [formStateErr, setFormStateErr] = useState(ERRORS);

    useEffect(() => {
        props.currentFormNameHandler(props.curForm);
    }, []);

    const checkRequiredFields = () => {
        let isValid = true;
        const newFormState = {};
        for (const key in user) {
            if (!user[key] && key in ERRORS) {
                isValid = false;
                newFormState[key] = {
                    'error': true,
                    'message': 'Обов’язкове поле',
                };
            } else {
                newFormState[key] = {
                    'error': false,
                    'message': '',
                };
            }
        }
        setFormStateErr({ ...formStateErr, ...newFormState });
        return isValid;
    };

    const onUpdateField = e => {
        if (e.target.name === 'person_position') {
            setProfile((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
        } else {
            setUser((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (checkRequiredFields()) {
            props.onUpdate(user, profile);
            // TODO something
        } else {
            // TODO something
        }
    };

    return (
        <div className={css['form__container']}>
            <form id="UserInfo" onSubmit={handleSubmit} autoComplete="off" noValidate>
                <div className={css['fields']}>
                    <div className={css['fields-groups']}>
                        <HalfFormField
                            inputType="text"
                            name="surname"
                            label={LABELS.surname}
                            updateHandler={onUpdateField}
                            error={formStateErr['surname']['error'] ? formStateErr['surname']['message'] : null}
                            requredField={true}
                            value={user.surname}
                        />
                        <HalfFormField
                            inputType="text"
                            name="name"
                            label={LABELS.name}
                            updateHandler={onUpdateField}
                            error={formStateErr['name']['error'] ? formStateErr['name']['message'] : null}
                            requredField={true}
                            value={user.name}
                        />
                    </div>
                    <div className={css['fields-groups']}>
                        <HalfFormField
                            inputType="text"
                            name="person_position"
                            label={LABELS.person_position}
                            updateHandler={onUpdateField}
                            requredField={false}
                            value={profile.person_position ?? ''}
                        />
                        <HalfFormField
                            inputType="text"
                            name="email"
                            label={LABELS.email}
                            requredField={true}
                            value={user.email}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UserInfo;
