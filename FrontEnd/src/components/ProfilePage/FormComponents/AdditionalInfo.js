import css from './FormComponents.module.css';
import { useState, useEffect } from 'react';

import HalfFormField from './FormFields/HalfFormField';
import TextField from './FormFields/TextField';

const LABELS = {
    'foundationYear': 'Рік заснування',
    'companySize': 'Розмір компанії',
    'topClients': 'Топ клієнти',
    'passedAudit': 'Пройдений аудит',
};

const TEXT_AREA_MAX_LENGTH = 1000;

const AdditionalInfo = (props) => {
    const [user, setUser] = useState(props.user);
    const [foundationYearError, setFoundationYearError] = useState(null);

    useEffect(() => {
        props.currentFormNameHandler(props.curForm);
    }, []); 

    const onUpdateTextAreaField = e => {
        if (e.target.value.length <= TEXT_AREA_MAX_LENGTH)
            setUser((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
    };

    const onUpdateField = e => {
        setUser((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const onUpdateFoundationYearField = e => {
        const currentYear = new Date().getFullYear();
        const year = Number(e.target.value);
        if ((1800 <= year && year <= currentYear) || !e.target.value) {
            setFoundationYearError(null);
        } else {
            setFoundationYearError(`Рік заснування не в діапазоні 1800-${currentYear}`);
        }
        setUser((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const validateForm = () => {
        let isValid = true;
        const currentYear = new Date().getFullYear();
        const year = Number(user.foundationYear);
        if ((1800 > year || year > currentYear) && user.foundationYear) {
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            props.onUpdate(user);
            // TODO something
        } else {
            // TODO something
        }
    };

    return (
        <div className={css['form__container']}>
            <form id='AdditionalInfo' onSubmit={handleSubmit} autoComplete='off' noValidate>
                <div className={css['fields']}>
                    <div className={css['fields-groups']}>
                        <HalfFormField
                            inputType='number'
                            name='foundationYear'
                            label={LABELS.foundationYear}
                            updateHandler={onUpdateFoundationYearField}
                            requredField={false}
                            value={user.foundationYear}
                            error={foundationYearError}
                        />
                        <HalfFormField
                            inputType='number'
                            name='companySize'
                            label={LABELS.companySize}
                            updateHandler={onUpdateField}
                            requredField={false}
                            value={user.companySize}
                        />
                    </div>
                    <TextField
                        name='topClients'
                        label={LABELS.topClients}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.topClients}
                        maxLength={TEXT_AREA_MAX_LENGTH}
                    />
                    <TextField
                        name='passedAudit'
                        label={LABELS.passedAudit}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.passedAudit}
                        maxLength={TEXT_AREA_MAX_LENGTH}
                    />
                </div>
            </form>
        </div>
    );
};

export default AdditionalInfo;
