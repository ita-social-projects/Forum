import css from './FormComponents.module.css';
import { useState, useEffect } from 'react';
import { useUser, useProfile } from '../../../hooks/';
import HalfFormField from './FormFields/HalfFormField';
import Loader from '../../loader/Loader';

const LABELS = {
    'founded': 'Рік заснування',
};

const AdditionalInfo = (props) => {
    const { user } = useUser();
    const { profile: mainProfile, mutate: profileMutate } = useProfile();
    const [profile, setProfile] = useState(props.profile);
    const [foundationYearError, setFoundationYearError] = useState(null);

    useEffect(() => {
        props.currentFormNameHandler(props.curForm);
    }, []);

    const onUpdateFoundationYearField = e => {
        const currentYear = new Date().getFullYear();
        const year = Number(e.target.value);
        if ((1800 <= year && year <= currentYear) || !e.target.value) {
            setFoundationYearError(null);
        } else {
            setFoundationYearError(`Рік заснування не в діапазоні 1800-${currentYear}`);
        }
        setProfile((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const validateForm = () => {
        let isValid = true;
        const currentYear = new Date().getFullYear();
        const year = Number(profile.founded);
        if ((1800 > year || year > currentYear) && profile.founded) {
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            const token = localStorage.getItem('Token');
            try {
                const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${user.profile_id}`, {
                    method: 'PATCH',
                    headers: {
                        'Authorization': `Token ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        founded: profile.founded,
                    }),
                });

                if (response.status === 200) {
                    const updatedProfileData = await response.json();
                    profileMutate(updatedProfileData);
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
                {(user && profile && mainProfile)
                    ?
                    <>
                        <form id="AdditionalInfo" onSubmit={handleSubmit} autoComplete="off" noValidate>
                            <div className={css['fields']}>
                                <div className={css['fields-groups']}>
                                    <HalfFormField
                                        inputType="number"
                                        name="founded"
                                        label={LABELS.founded}
                                        updateHandler={onUpdateFoundationYearField}
                                        requredField={false}
                                        value={profile.founded ?? ''}
                                        error={foundationYearError}
                                    />
                                </div>
                            </div>
                        </form>
                    </>
                    : <Loader />}
            </div>
        );
    };

    export default AdditionalInfo;
