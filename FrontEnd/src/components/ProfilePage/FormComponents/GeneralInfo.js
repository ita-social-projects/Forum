import css from './FormComponents.module.css';
import { useState, useEffect } from 'react';

import CheckBoxField from './FormFields/CheckBoxField';
import FullField from './FormFields/FullField';
import HalfFormField from './FormFields/HalfFormField';
import ImageField from './FormFields/ImageField';
import MultipleSelectChip from './FormFields/MultipleSelectChip';
import TextField from './FormFields/TextField';

const LABELS = {
    'companyName': 'Назва компанії',
    'brend': 'Бренд',
    'companyOfficialName': 'Юридична назва компанії',
    'edrpou': 'ЄДРПОУ / ІПН',
    'regions': 'Регіон(и)',
    'categories': 'Категорія(ї)',
    'activities': 'Вид(и) діяльності',
    'bannerImage': 'Зображення для банера',
    'logo': 'Логотип',
    'slogan': 'Візія, слоган',
    'companyInfo': 'Інформація про компанію',
    'companyCheckbox': 'Зареєстрована компанія',
    'startupCheckbox': 'Стартап проект, який шукає інвестиції',
};

const CATEGORIES = [
    { name: "Вино" },
    { name: "Продукти переробляння молока" },
    { name: "Соуси" },
    { name: "Кава" },
    { name: "Чай та чайні напої" },
    { name: "Алкоголь" },
    { name: "Упакування" },
    { name: "Кондитерські вироби" },
    { name: "Спеції" },
];

const REGIONS = [
    { name: "Київська область" },
    { name: "Вінницька область" },
    { name: "Волинська область" },
    { name: "Дніпропетровська область" },
    { name: "Донецька область" },
    { name: "Житомирська область" },
    { name: "Закарпатська область" },
    { name: "Запорізька область" },
    { name: "Івано-Франківська область" },
    { name: "Кіровоградська область" },
    { name: "Крим" },
    { name: "Луганська область" },
    { name: "Львівська область" },
    { name: "Миколаївська область" },
    { name: "Одеська область" },
    { name: "Полтавська область" },
    { name: "Рівненська область" },
    { name: "Сумська область" },
    { name: "Тернопільська область" },
    { name: "Харківська область" },
    { name: "Херсонська область" },
    { name: "Хмельницька область" },
    { name: "Черкаська область" },
    { name: "Чернівецька область" },
    { name: "Чернігівська область" },
];

const ACTIVITIES = [
    { name: "Виробництво" },
    { name: "Роздрібна мережа" },
    { name: "Імпортер" },
    { name: "HORECA" },
    { name: "Інші послуги" },
];

const ERRORS = {
    companyName: {
        'error': false,
        'message': ''
    },
    categories: {
        'error': false,
        'message': ''
    },
    activities: {
        'error': false,
        'message': ''
    },
};

const TEXT_AREA_MAX_LENGTH = 1000;
const IMAGE_SIZE = 50 * 1024 * 1024;

const GeneralInfo = (props) => {
    const [user, setUser] = useState(props.user);
    const [formStateErr, setFormStateErr] = useState(ERRORS);
    const [imageBannerError, setImageBannerError] = useState(null);
    const [imageLogoError, setImageLogoError] = useState(null);
    const [edrpouError, setEdrpouError] = useState(null);

    useEffect(() => {
        props.currentFormNameHandler(props.curForm);
    }, []);

    const checkRequiredFields = () => {
        let isValid = true;
        const newFormState = {};
        for (const key in user) {
            if ((!user[key] || (typeof user[key] === 'object' && user[key].length === 0)) && key in ERRORS) {
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
        if (user.edrpou && user.edrpou.length !== 8) {
            isValid = false;
        }
        return isValid;
    };

    const onUpdateField = e => {
        setUser((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const onUpdateEdrpouField = e => {
        if (e.target.value && e.target.value.length !== 8) {
            setEdrpouError('ЄДРПОУ має містити 8 символів');
            setUser((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
        } else {
            setEdrpouError(null);
            setUser((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
        }
    };

    const onUpdateImageField = e => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > IMAGE_SIZE) {
                if (e.target.name === 'logo') {
                    setImageLogoError('Максимальний розмір файлу 50Mb');
                } else {
                    setImageBannerError('Максимальний розмір файлу 50Mb');
                }
            } else {
                if (e.target.name === 'logo') {
                    setImageLogoError(null);
                } else {
                    setImageBannerError(null);
                }
                setUser((prevState) => {
                    return { ...prevState, [e.target.name]: file };
                });
            }
        }
    };

    const deleteImageHandler = (name) => {
        setUser((prevState) => {
            return { ...prevState, [name]: '' };
        });
    };

    const onChangeCheckbox = e => {
        if (e.target.name === 'startupCheckbox') {
            setUser((prevState) => {
                return { ...prevState, [e.target.name]: true, 'companyCheckbox': false };
            });
        } else if (e.target.name === 'companyCheckbox') {
            setUser((prevState) => {
                return { ...prevState, [e.target.name]: true, 'startupCheckbox': false };
            });
        }
    };

    const onUpdateTextAreaField = e => {
        if (e.target.value.length <= TEXT_AREA_MAX_LENGTH)
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
        if (checkRequiredFields()) {
            props.onUpdate(user);
            // TODO something
        } else {
            // TODO something
        }
    };
    return (
        <div className={css['form__container']}>
            <form id='GeneralInfo' onSubmit={handleSubmit} autoComplete='off' noValidate>
                <div className={css['fields']}>
                    <div className={css['fields-groups']}>
                        <HalfFormField
                            name='companyName'
                            label={LABELS.companyName}
                            updateHandler={onUpdateField}
                            error={formStateErr['companyName']['error'] ? formStateErr['companyName']['message'] : null}
                            requredField={true}
                            value={user.companyName}
                        />
                        <HalfFormField
                            inputType='text'
                            name='brend'
                            label={LABELS.brend}
                            updateHandler={onUpdateField}
                            requredField={false}
                            value={user.brend}
                        />
                    </div>
                    <FullField
                        name='companyOfficialName'
                        label={LABELS.companyOfficialName}
                        updateHandler={onUpdateField}
                        requredField={false}
                        value={user.companyOfficialName}
                    />
                    <div className={css['fields-groups']}>
                        <HalfFormField
                            inputType='text'
                            name='edrpou'
                            label={LABELS.edrpou}
                            updateHandler={onUpdateEdrpouField}
                            requredField={false}
                            value={user.edrpou}
                            error={edrpouError}
                        />
                        <MultipleSelectChip
                            name='regions'
                            options={REGIONS}
                            label={LABELS.regions}
                            updateHandler={onUpdateSelectField}
                            requredField={false}
                            value={user.regions}
                            defaultValue="Оберіть"
                        />
                    </div>
                    <div className={css['fields-groups']}>
                        <MultipleSelectChip
                            name='activities'
                            options={ACTIVITIES}
                            label={LABELS.activities}
                            updateHandler={onUpdateSelectField}
                            requredField={true}
                            value={user.activities}
                            defaultValue="Оберіть"
                            error={formStateErr['activities']['error'] ? formStateErr['activities']['message'] : null}
                        />
                        <MultipleSelectChip
                            name='categories'
                            options={CATEGORIES}
                            label={LABELS.categories}
                            updateHandler={onUpdateSelectField}
                            requredField={true}
                            value={user.categories}
                            defaultValue="Оберіть"
                            error={formStateErr['categories']['error'] ? formStateErr['categories']['message'] : null}
                        />
                    </div>
                    <ImageField
                        inputType='file'
                        name='bannerImage'
                        label={LABELS.bannerImage}
                        updateHandler={onUpdateImageField}
                        requredField={false}
                        value={user.bannerImage.name}
                        error={imageBannerError}
                        onDeleteImage={deleteImageHandler}
                    />
                    <ImageField
                        inputType='file'
                        name='logo'
                        label={LABELS.logo}
                        updateHandler={onUpdateImageField}
                        requredField={false}
                        value={user.logo.name}
                        error={imageLogoError}
                        onDeleteImage={deleteImageHandler}
                    />
                    <TextField
                        name='slogan'
                        label={LABELS.slogan}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.slogan}
                        maxLength={TEXT_AREA_MAX_LENGTH}
                    />
                    <TextField
                        name='companyInfo'
                        label={LABELS.companyInfo}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.companyInfo}
                        maxLength={TEXT_AREA_MAX_LENGTH}
                    />
                    <CheckBoxField
                        name='companyType'
                        nameRegister='companyCheckbox'
                        valueRegister={user.companyCheckbox}
                        nameStartup='startupCheckbox'
                        valueStartup={user.startupCheckbox}
                        updateHandler={onChangeCheckbox}
                        requredField={true}
                    />
                </div>
            </form>
        </div>
    );
};

export default GeneralInfo;
