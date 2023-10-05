import css from './FormComponents.module.css';
import { useState, useEffect } from 'react';

import HalfFormField from './FormFields/HalfFormField';

const LABELS = {
    'founded': 'Рік заснування',
};

const AdditionalInfo = (props) => {
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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            props.onUpdate(profile);
        } else {
            console.log('error');
        }
    };

    return (
        <div className={css['form__container']}>
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
        </div>
    );
};

export default AdditionalInfo;
