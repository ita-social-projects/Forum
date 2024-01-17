import css from './FormComponents.module.css';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { useUser, useProfile } from '../../../hooks/';
import TextField from './FormFields/TextField';
import Loader from '../../loader/Loader';

const LABELS = {
    'startup_idea': 'Опис ідеї стартапу'
};

const TEXT_AREA_MAX_LENGTH = 1000;

const StartupInfo = (props) => {
    const { user } = useUser();
    const { profile: mainProfile, mutate: profileMutate } = useProfile();
    const [profile, setProfile] = useState(props.profile);

    useEffect(() => {
        props.currentFormNameHandler(props.curForm);
    }, []);

    const onUpdateTextAreaField = e => {
        if (e.target.value.length <= TEXT_AREA_MAX_LENGTH)
            setProfile((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('Token');
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${user.profile_id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    startup_idea: profile.startup_idea,
                }),
            });

            if (response.status === 200) {
                const updatedProfileData = await response.json();
                profileMutate(updatedProfileData);
                toast.success('Зміни успішно збережено');
            } else {
                console.error('Помилка');
            }
        } catch (error) {
            console.error('Помилка:', error);
        }
    };

    return (
        <div className={css['form__container']}>
            {(user && profile && mainProfile)
                ?
                <form id="StartupInfo" onSubmit={handleSubmit} autoComplete="off" noValidate>
                    <div className={css['fields']}>
                        <TextField
                            name="startup_idea"
                            label={LABELS.startup_idea}
                            updateHandler={onUpdateTextAreaField}
                            requredField={false}
                            value={profile.startup_idea ?? ''}
                            maxLength={TEXT_AREA_MAX_LENGTH}
                        />
                    </div>
                </form>
                : <Loader />}
        </div>
    );
};

export default StartupInfo;
