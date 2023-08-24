import css from './FormComponents.module.css';
import HalfFormField from './FormFields/HalfFormField';
import Mybutton from '../UI/Mybutton/Mybutton';
import { useState, useEffect } from 'react';
import { UsePrompt } from '../hooks/usePrompt';

const LABELS = {
    'surname': 'Прізвище',
    'name': 'Ім‘я',
    'position': 'Посада в компанії чи стартапі',
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
    const [formStateErr, setFormStateErr] = useState(ERRORS);
    const [isBlocking, setIsBlocking] = useState(false);

    useEffect(() => {
        setIsBlocking(user !== props.user);
    }, [user]);

    const checkRequiredFields = () => {
        let isValid = true;
        const newFormState = {};
        for (const key in user) {
            if (!user[key] && key in ERRORS) {
                isValid = false;
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
        setFormStateErr({ ...formStateErr, ...newFormState });
        return isValid;
    };

    const onUpdateField = e => {
        setUser((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (checkRequiredFields()) {
            props.onUpdate(user);
            // TODO something
        } else {
            // TODO something
        }
    };

    return (
        <div className={css['form__container']}>
            <UsePrompt
                when={isBlocking}
                message='Введені дані не є збережені, при переході на іншу сторінку, вони буду втрачені?'
            />
            <form onSubmit={handleSubmit} autoComplete='off' noValidate>
                <div className={css['fields']}>
                    <div className={css['fields-groups']}>
                        <HalfFormField
                            inputType='text'
                            name='surname'
                            label={LABELS.surname}
                            updateHandler={onUpdateField}
                            error={formStateErr['surname']['error'] ? formStateErr['surname']['message'] : null}
                            requredField={true}
                            value={user.surname}
                        />
                        <HalfFormField
                            inputType='text'
                            name='name'
                            label={LABELS.name}
                            updateHandler={onUpdateField}
                            error={formStateErr['name']['error'] ? formStateErr['name']['message'] : null}
                            requredField={true}
                            value={user.name}
                        />
                    </div>
                    <div className={css['fields-groups']}>
                        <HalfFormField
                            inputType='text'
                            name='position'
                            label={LABELS.position}
                            updateHandler={onUpdateField}
                            requredField={false}
                            value={user.position}
                        />
                        <HalfFormField
                            inputType='text'
                            name='email'
                            label={LABELS.email}
                            requredField={true}
                            value={user.email}
                        />
                    </div>
                </div>
                <Mybutton />
            </form>
        </div>
    );
};

export default UserInfo;