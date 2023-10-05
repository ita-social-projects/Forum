import css from './FormComponents.module.css';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

import CheckBoxField from './FormFields/CheckBoxField';
import FullField from './FormFields/FullField';
import HalfFormField from './FormFields/HalfFormField';
// import ImageField from './FormFields/ImageField';
// import MultipleSelectChip from './FormFields/MultipleSelectChip';
import OneSelectChip from './FormFields/OneSelectChip';
import TextField from './FormFields/TextField';
import Loader from '../../loader/Loader';

const LABELS = {
    'name': 'Назва компанії',
    'brend': 'Бренд',
    'official_name': 'Юридична назва компанії',
    'edrpou': 'ЄДРПОУ / ІПН',
    'region': 'Регіон(и)',
    'categories': 'Категорія(ї)',
    'activities': 'Вид(и) діяльності',
    'bannerImage': 'Зображення для банера',
    'logo': 'Логотип',
    'slogan': 'Візія, слоган',
    'common_info': 'Інформація про компанію',
    'is_registered': 'Зареєстрована компанія',
    'is_startup': 'Стартап проект, який шукає інвестиції',
};

const ERRORS = {
    name: {
        'error': false,
        'message': ''
    },
    // categories: {
    //     'error': false,
    //     'message': ''
    // },
    // activities: {
    //     'error': false,
    //     'message': ''
    // },
};

const TEXT_AREA_MAX_LENGTH = 1000;
// const IMAGE_SIZE = 50 * 1024 * 1024;

const fetcher = (...args) => fetch(...args).then(res => res.json());

const GeneralInfo = (props) => {
    const [profile, setProfile] = useState(props.profile);
    // const organizedActivities = props.profile.activities;
    // console.log(organizedActivities);
    // fetchedActivities.find((el) => el.key === profile.activities)?.value
    const [formStateErr, setFormStateErr] = useState(ERRORS);
    // const [imageBannerError, setImageBannerError] = useState(null);
    // const [imageLogoError, setImageLogoError] = useState(null);
    const [edrpouError, setEdrpouError] = useState(null);

    const { data: fetchedRegions, isLoading: isRegionLoading } = useSWR(`${process.env.REACT_APP_BASE_API_URL}/api/regions/`, fetcher);

    // const { data: fetchedActivities, isLoading: isActivitiesLoading } = useSWR(`${process.env.REACT_APP_BASE_API_URL}/api/activities/`, fetcher);

    useEffect(() => {
        props.currentFormNameHandler(props.curForm);
    }, []);

    const checkRequiredFields = () => {
        let isValid = true;
        const newFormState = {};
        for (const key in profile) {
            if ((!profile[key] || (typeof profile[key] === 'object' && profile[key].length === 0)) && key in ERRORS) {
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
        if (profile.edrpou && profile.edrpou.length !== 8) {
            isValid = false;
        }
        return isValid;
    };

    const onUpdateField = e => {
        setProfile((prevState) => {
            return { ...prevState, [e.target.name]: e.target.value };
        });
    };

    const onUpdateOneSelectField = e => {
        const selectedRegion = fetchedRegions.find((el) => el.value === e.target.value);
        setProfile((prevState) => {
            return { ...prevState, [e.target.name]: selectedRegion.key };
        });
    };

    const onUpdateEdrpouField = e => {
        if (e.target.value && e.target.value.length !== 8) {
            setEdrpouError('ЄДРПОУ має містити 8 символів');
            setProfile((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
        } else {
            setEdrpouError(null);
            setProfile((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
        }
    };

    // const onUpdateImageField = e => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         if (file.size > IMAGE_SIZE) {
    //             if (e.target.name === 'logo') {
    //                 setImageLogoError('Максимальний розмір файлу 50Mb');
    //             } else {
    //                 setImageBannerError('Максимальний розмір файлу 50Mb');
    //             }
    //         } else {
    //             if (e.target.name === 'logo') {
    //                 setImageLogoError(null);
    //             } else {
    //                 setImageBannerError(null);
    //             }
    //             setProfile((prevState) => {
    //                 return { ...prevState, [e.target.name]: file };
    //             });
    //         }
    //     }
    // };

    // const deleteImageHandler = (name) => {
    //     setProfile((prevState) => {
    //         return { ...prevState, [name]: '' };
    //     });
    // };

    const onChangeCheckbox = e => {
        if (e.target.name === 'is_startup') {
            setProfile((prevState) => {
                return { ...prevState, [e.target.name]: true, 'is_registered': false };
            });
        } else if (e.target.name === 'is_registered') {
            setProfile((prevState) => {
                return { ...prevState, [e.target.name]: true, 'is_startup': false };
            });
        }
    };

    const onUpdateTextAreaField = e => {
        if (e.target.value.length <= TEXT_AREA_MAX_LENGTH)
            setProfile((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
    };

    // const onUpdateSelectField = e => {
    //     const selectName = e.target.name;
    //     const selectedValues = Array.from(e.target.value, option => option);
    //     setProfile((prevState) => {
    //         return { ...prevState, [selectName]: selectedValues };
    //     });
    // };

    const handleSubmit = (event) => {
        event.preventDefault();

        // let selectedActivities = [];
        // for (let activity of profile.activities) {
        //     let item = fetchedActivities.find((el) => el.name === activity);
        //     if (item) {
        //         selectedActivities.push(item.id);
        //     }
        // }
        // if (checkRequiredFields()) {
        //     props.onUpdate({ ...profile, 'activities': selectedActivities });
        // } else {
        //     console.log('error');
        // }

        if (checkRequiredFields()) {
            props.onUpdate(profile);
        } else {
            console.log('error');
        }
    };
    return (
        <div className={css['form__container']}>
            <form id="GeneralInfo" onSubmit={handleSubmit} autoComplete="off" noValidate>
                <div className={css['fields']}>
                    <div className={css['fields-groups']}>
                        <HalfFormField
                            name="name"
                            label={LABELS.name}
                            updateHandler={onUpdateField}
                            error={formStateErr['name']['error'] ? formStateErr['name']['message'] : null}
                            requredField={true}
                            value={profile.name}
                        />
                    </div>
                    <FullField
                        name="official_name"
                        label={LABELS.official_name}
                        updateHandler={onUpdateField}
                        requredField={false}
                        value={profile.official_name ?? ''}
                    />
                    <div className={css['fields-groups']}>
                        <HalfFormField
                            inputType="text"
                            name="edrpou"
                            label={LABELS.edrpou}
                            updateHandler={onUpdateEdrpouField}
                            requredField={false}
                            value={profile.edrpou ?? ''}
                            error={edrpouError}
                        />
                        {isRegionLoading
                            ?
                            <Loader />
                            :
                            <OneSelectChip
                                name="region"
                                options={fetchedRegions}
                                label={LABELS.region}
                                updateHandler={onUpdateOneSelectField}
                                requredField={false}
                                defaultValue="Оберіть"
                                value={fetchedRegions.find((el) => el.key === profile.region)?.value ?? ''}
                            />
                        }
                    </div>
                    <div className={css['fields-groups']}>
                        {/* {isActivitiesLoading
                            ?
                            <Loader />
                            :
                        <MultipleSelectChip
                            name="activities"
                            options={fetchedActivities}
                            label={LABELS.activities}
                            updateHandler={onUpdateSelectField}
                            requredField={true}
                            value={profile.activities.map(obj => obj.name) ?? ''}
                            defaultValue="Оберіть"
                            error={formStateErr['activities']['error'] ? formStateErr['activities']['message'] : null}
                        />
                    } */}
                        {/* <MultipleSelectChip
                            name="categories"
                            options={CATEGORIES}
                            label={LABELS.categories}
                            updateHandler={onUpdateSelectField}
                            requredField={true}
                            value={profile.categories}
                            defaultValue="Оберіть"
                            error={formStateErr['categories']['error'] ? formStateErr['categories']['message'] : null}
                        /> */}
                    </div>
                    {/* <ImageField
                        inputType="file"
                        name="bannerImage"
                        label={LABELS.bannerImage}
                        updateHandler={onUpdateImageField}
                        requredField={false}
                        value={profile.bannerImage.name}
                        error={imageBannerError}
                        onDeleteImage={deleteImageHandler}
                    />
                    <ImageField
                        inputType="file"
                        name="logo"
                        label={LABELS.logo}
                        updateHandler={onUpdateImageField}
                        requredField={false}
                        value={profile.logo.name}
                        error={imageLogoError}
                        onDeleteImage={deleteImageHandler}
                    /> */}
                    <TextField
                        name="common_info"
                        label={LABELS.common_info}
                        updateHandler={onUpdateTextAreaField}
                        requredField={false}
                        value={profile.common_info ?? ''}
                        maxLength={TEXT_AREA_MAX_LENGTH}
                    />
                    <CheckBoxField
                        name="companyType"
                        nameRegister="is_registered"
                        valueRegister={profile.is_registered}
                        nameStartup="is_startup"
                        valueStartup={profile.is_startup}
                        updateHandler={onChangeCheckbox}
                        requredField={true}
                    />
                </div>
            </form>
        </div>
    );
};

export default GeneralInfo;
