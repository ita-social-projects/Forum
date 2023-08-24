import css from './FormComponents.module.css';
import { useState, useEffect } from 'react';

import FullField from './FormFields/FullField';
import MultipleSelectChip from './FormFields/MultipleSelectChip';
import TextField from './FormFields/TextField';

import ConfirmPrompt from '../hooks/usePrompt';
import Mybutton from '../UI/Mybutton/Mybutton';

const LABELS = {
    'startupName': 'Назва стартапу',
    'investmentAmount': 'Розмір інвестицій (в гривнях)',
    'cooperationGoals': 'Ціль співпраці',
    'endResult': 'Кінцевий результат',
    'competitiveAdvantageIdea': 'Конкурентна перевага ідеї',
    'risks': 'Ризики',
    'searchPartners': 'Пошук партнерів',
    'startupIdea': 'Опис ідеї стартапу'
};

const COOPERATION_GOALS = [
    { name: "Гроші" },
    { name: "Партнерство" },
];

const StartupInfo = (props) => {
    const [user, setUser] = useState(props.user);
    const maxLength = 1000;
    const [isBlocking, setIsBlocking] = useState(false);

    useEffect(() => {
        setIsBlocking(user !== props.user);
    }, [user]);

    const onUpdateField = e => {
        setUser((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const onUpdateTextAreaField = e => {
        if (e.target.value.length <= maxLength)
            setUser((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
    };

    const onUpdateSelectField = e => {
        const selectName = e.target.name;
        const selectedValues = Array.from(e.target.value, option => option);
        setUser((prevState) => {
            return { ...prevState, [selectName]: selectedValues };
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onUpdate(user);
        // TODO something
    };

    return (
        <div className={css['form__container']}>
            <ConfirmPrompt
                when={isBlocking}
                message='Введені дані не є збережені, при переході на іншу сторінку, вони буду втрачені?'
            />
            <form onSubmit={handleSubmit} autoComplete='off' noValidate>
                <div className={css['fields']}>
                    <FullField
                        name='startupName'
                        label={LABELS.startupName}
                        updateHandler={onUpdateField}
                        requredField={false}
                        value={user.startupName}
                    />
                    <TextField
                        name='startupIdea'
                        label={LABELS.startupIdea}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.startupIdea}
                        maxLength={maxLength}
                    />
                    <FullField
                        inputType='number'
                        name='investmentAmount'
                        label={LABELS.investmentAmount}
                        updateHandler={onUpdateField}
                        requredField={false}
                        value={user.investmentAmount}
                    />
                    <MultipleSelectChip
                        selectedWidth='530px'
                        name='cooperationGoals'
                        options={COOPERATION_GOALS}
                        label={LABELS.cooperationGoals}
                        updateHandler={onUpdateSelectField}
                        requredField={false}
                        value={user.cooperationGoals}
                        defaultValue="Оберіть"
                    />
                    <TextField
                        name='endResult'
                        label={LABELS.endResult}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.endResult}
                        maxLength={maxLength}
                    />
                    <TextField
                        name='competitiveAdvantageIdea'
                        label={LABELS.competitiveAdvantageIdea}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.competitiveAdvantageIdea}
                        maxLength={maxLength}
                    />
                    <TextField
                        name='risks'
                        label={LABELS.risks}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.risks}
                        maxLength={maxLength}
                    />
                    <TextField
                        name='searchPartners'
                        label={LABELS.searchPartners}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.searchPartners}
                        maxLength={maxLength}
                    />
                </div>
                <Mybutton />
            </form>
        </div>
    );
};

export default StartupInfo;