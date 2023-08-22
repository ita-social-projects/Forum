import css from './FormComponents.module.css';
import { useState, useEffect } from 'react';

import CheckBoxField from './FormFields/CheckBoxField';
import FullField from './FormFields/FullField';
import HalfFormField from './FormFields/HalfFormField';
import ImageField from './FormFields/ImageField';
import MultipleSelectChip from './FormFields/MultipleSelectChip';
import TextField from './FormFields/TextField';

import Mybutton from '../UI/Mybutton/Mybutton';

const LABELS = {
    'companyName': 'Назва компанії',
    'companyOfficialName': 'Юридична назва компанії',
    'edrpou': 'ЄДРПОУ',
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
    }
};

const GeneralInfo = (props) => {
    const [user, setUser] = useState(props.user);
    const [selectedRegions, setSelectedRegions] = useState(props.user.regions);
    const [selectedActivities, setSelectedActivities] = useState(props.user.activities);
    const [selectedCategories, setSelectedCategories] = useState(props.user.categories);
    const maxLength = 1000;
    const [formStateErr, setFormStateErr] = useState(ERRORS);
    const [imageBannerError, setImageBannerError] = useState(null);
    const [imageLogoError, setImageLogoError] = useState(null);
    const [edrpouError, setEdrpouError] = useState(null);

    const checkRequiredFields = () => {
        let isValid = true;
        const newFormState = {};
        for (const key in user) {
            if (!user[key] && key in ERRORS) {
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
        const allowedSize = 50 * 1024 * 1024;
        if (file) {
            if (file.size > allowedSize) {
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
        if (e.target.value.length <= maxLength)
            setUser((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
    };

    const onUpdateSelectField = e => {
        const selectName = e.target.name;
        if (selectName === 'activities') {
            setSelectedActivities(Array.from(e.target.value, option => option));
        } else if (selectName === 'categories') {
            setSelectedCategories(Array.from(e.target.value, option => option));
        } else if (selectName === 'regions') {
            setSelectedRegions(Array.from(e.target.value, option => option));
        }
    };

    useEffect(() => {
        setUser((prevState) => {
            return { ...prevState, 'regions': selectedRegions, 'activities': selectedActivities, 'categories': selectedCategories };
        });
    }, [selectedRegions, selectedActivities, selectedCategories]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (checkRequiredFields()) {
            props.onUpdate(user);
            // TODO something
        } else {
            console.log('error');
            // TODO something
        }
    };
    return (
        <div className={css['form__container']}>
            <form onSubmit={handleSubmit} autoComplete='off' noValidate>
                <div className={css['fields']}>
                    <FullField
                        name='companyName'
                        label={LABELS.companyName}
                        updateHandler={onUpdateField}
                        error={formStateErr['companyName']['error'] ? formStateErr['companyName']['message'] : null}
                        requredField={true}
                        value={user.companyName}
                    />
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
                            value={selectedRegions}
                            defaultValue="Оберіть"
                        />
                    </div>
                    <div className={css['fields-groups']}>
                        <MultipleSelectChip
                            name='activities'
                            options={ACTIVITIES}
                            label={LABELS.activities}
                            updateHandler={onUpdateSelectField}
                            requredField={false}
                            value={selectedActivities}
                            defaultValue="Оберіть"
                        />
                        <MultipleSelectChip
                            name='categories'
                            options={CATEGORIES}
                            label={LABELS.categories}
                            updateHandler={onUpdateSelectField}
                            requredField={false}
                            value={selectedCategories}
                            defaultValue="Оберіть"
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
                        maxLength={maxLength}
                    />
                    <TextField
                        name='companyInfo'
                        label={LABELS.companyInfo}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={user.companyInfo}
                        maxLength={maxLength}
                    />
                    <CheckBoxField
                        name='companyType'
                        nameRegister='companyCheckbox'
                        valueRegister={user.companyCheckbox}
                        nameStartup='startupCheckbox'
                        valueStartup={user.startupCheckbox}
                        updateHandler={onChangeCheckbox}
                        // error={formStateErr['companyName']['error'] ? formStateErr['companyName']['message'] : null}
                        requredField={true}
                    />
                </div>
                <Mybutton />
            </form>
        </div>
    );
};

export default GeneralInfo;