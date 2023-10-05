import css from './FormComponents.module.css';
import { useState, useEffect } from 'react';
import TextField from './FormFields/TextField';


const LABELS = {
    'startup_idea': 'Опис ідеї стартапу'
};

const TEXT_AREA_MAX_LENGTH = 1000;

const StartupInfo = (props) => {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onUpdate(profile);
    };

    return (
        <div className={css['form__container']}>
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
        </div>
    );
};

export default StartupInfo;
