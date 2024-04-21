import axios from 'axios';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { DirtyFormContext } from  '../../../context/DirtyFormContext';
import { useAuth, useProfile } from '../../../hooks/';
import checkFormIsDirty from '../../../utils/checkFormIsDirty';
import HalfFormField from './FormFields/HalfFormField';
import Loader from '../../loader/Loader';
import css from './FormComponents.module.css';

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
    const { user, mutate: userMutate } = useAuth();
    const { profile, mutate: profileMutate } = useProfile();
    const [updateUser, setUpdateUser] = useState(props.user);
    const [updateProfile, setUpdateProfile] = useState(props.profile);
    const [formStateErr, setFormStateErr] = useState(ERRORS);
    const { setFormIsDirty } = useContext(DirtyFormContext);

    const fields = {
        'surname': {defaultValue: user?.surname ?? '', context: 'user'},
        'name': {defaultValue: user?.name ?? '', context: 'user'},
        'person_position': {defaultValue: profile?.person_position ?? null},
    };

    useEffect(() => {
        const isDirty = checkFormIsDirty(fields, updateUser, updateProfile);
        setFormIsDirty(isDirty);
      }, [user, profile, updateUser, updateProfile]);

    useEffect(() => {
        props.currentFormNameHandler(props.curForm);
    }, []);

    const checkRequiredFields = () => {
        let isValid = true;
        const newFormState = {};
        for (const key in updateUser) {
            if (!updateUser[key] && key in ERRORS) {
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
        if (user.name.length < 2 || user.surname.length < 2) {
            isValid = false;
        }
        if (profile.person_position !== 0 && profile.person_position < 2) {
            isValid = false;
        }
        return isValid;
    };

    const errorMessageTemplates = {
        fieldLength: 'Введіть від 2 до 50 символів',
        notAllowedSymbols: 'Поле містить недопустимі символи та/або цифри',
      };

    const onUpdateField = e => {
        const patterns = {
            'person_position': /^[a-zA-Zа-щюяА-ЩЮЯїЇіІєЄґҐ' -]*$/,
            'name': /^[a-zA-Zа-щюяА-ЩЮЯїЇіІєЄґҐ']+$/,
            'surname': /^[a-zA-Zа-щюяА-ЩЮЯїЇіІєЄґҐ']+$/
        };
        const { value: fieldValue, name: fieldName } = e.target;
        const isValidLength = fieldValue.length >= 2 || (fieldName === 'person_position' && fieldValue.length === 0);
        const isValidPattern = patterns[fieldName].test(fieldValue);
        let errorMessage = '';

        if (fieldValue && !isValidPattern) {
            errorMessage = errorMessageTemplates.notAllowedSymbols;
        } else if (!isValidLength) {
            errorMessage = errorMessageTemplates.fieldLength;
        }

        setFormStateErr(prevState => ({
            ...prevState,
            [fieldName]: { 'error': !isValidLength || !isValidPattern, 'message': errorMessage }
        }));

        if (fieldName === 'person_position') {
            setUpdateProfile(prevState => ({ ...prevState, [fieldName]: fieldValue }));
        } else {
            setUpdateUser(prevState => ({ ...prevState, [fieldName]: fieldValue }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!checkRequiredFields()) {
            toast.error('Зміни не можуть бути збережені, перевірте правильність заповнення полів');
        } else {
            axios.all([
                axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/auth/users/me/`, {
                    surname: updateUser.surname,
                    name: updateUser.name
                    }),
                axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${user.profile_id}`, {
                person_position: updateProfile.person_position ,
                })
            ])
            .then(axios.spread((updatedUserData , updatedProfileData ) => {
                userMutate(updatedUserData .data);
                profileMutate(updatedProfileData .data);
                setFormIsDirty(false);
                toast.success('Зміни успішно збережено');
            }))
            .catch((error) => {
                console.error('Помилка:', error.response ? error.response.data : error.message);
                if (!error.response || error.response.status !== 401) {
                    toast.error('Не вдалося зберегти зміни, сталася помилка');
                }
            });
        }
    };

    return (
        <div className={css['form__container']}>
            {(updateUser && user && profile && updateProfile)
                ?
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
                                value={updateUser.surname}
                                maxLength={50}
                            />
                            <HalfFormField
                                inputType="text"
                                name="name"
                                label={LABELS.name}
                                updateHandler={onUpdateField}
                                error={formStateErr['name']['error'] ? formStateErr['name']['message'] : null}
                                requredField={true}
                                value={updateUser.name}
                                maxLength={50}
                            />
                        </div>
                        <div className={css['fields-groups']}>
                            <HalfFormField
                                inputType="text"
                                name="person_position"
                                label={LABELS.person_position}
                                updateHandler={onUpdateField}
                                error={formStateErr['person_position']?.['error'] ? formStateErr['person_position']['message'] : null}
                                requredField={false}
                                value={updateProfile.person_position ?? ''}
                            />
                            <HalfFormField
                                inputType="text"
                                name="email"
                                label={LABELS.email}
                                requredField={true}
                                value={updateUser.email}
                            />
                        </div>
                    </div>
                </form>
                : <Loader />
            }
        </div>
    );
};

export default UserInfo;
