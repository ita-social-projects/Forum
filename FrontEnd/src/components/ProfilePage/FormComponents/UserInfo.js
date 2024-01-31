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

    // TODO: update default values as new fields added

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
        return isValid;
    };

    const onUpdateField = e => {
        if (e.target.name === 'person_position') {
            setUpdateProfile((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
        } else {
            setUpdateUser((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (checkRequiredFields()) {
            const token = localStorage.getItem('Token');

            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/auth/users/me/`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ surname: updateUser.surname, name: updateUser.name }),
                });

                if (response.status === 200) {
                    const updatedUserData = await response.json();
                    userMutate(updatedUserData);
                    setFormIsDirty(false);
                    toast.success('Зміни успішно збережено');
                } else {
                    console.error('Помилка');
                }
            } catch (error) {
                console.error('Помилка:', error);
            }

            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${user.profile_id}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ person_position: updateProfile.person_position }),
                });

                if (response.status === 200) {
                    const updatedProfileData = await response.json();
                    profileMutate(updatedProfileData);
                    setFormIsDirty(false);
                    toast.success('Зміни успішно збережено');
                } else {
                    console.error('Помилка');
                }
            } catch (error) {
                console.error('Помилка:', error);
            }
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
                            />
                            <HalfFormField
                                inputType="text"
                                name="name"
                                label={LABELS.name}
                                updateHandler={onUpdateField}
                                error={formStateErr['name']['error'] ? formStateErr['name']['message'] : null}
                                requredField={true}
                                value={updateUser.name}
                            />
                        </div>
                        <div className={css['fields-groups']}>
                            <HalfFormField
                                inputType="text"
                                name="person_position"
                                label={LABELS.person_position}
                                updateHandler={onUpdateField}
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
