import axios from 'axios';
import { PropTypes } from 'prop-types';
import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import { useAuth, useProfile } from '../../../hooks/';
import checkFormIsDirty from '../../../utils/checkFormIsDirty';
import css from './FormComponents.module.css';

import { DirtyFormContext } from  '../../../context/DirtyFormContext';
import CheckBoxField from './FormFields/CheckBoxField';
import FullField from './FormFields/FullField';
import HalfFormField from './FormFields/HalfFormField';
import ImageField from './FormFields/ImageField';
import MultipleSelectChip from './FormFields/MultipleSelectChip';
import OneSelectChip from './FormFields/OneSelectChip';
import TextField from './FormFields/TextField';
import Loader from '../../loader/Loader';

const LABELS = {
    'name': 'Назва компанії',
    'official_name': 'Юридична назва компанії',
    'edrpou': 'ЄДРПОУ / ІПН',
    'region': 'Регіон(и)',
    'categories': 'Категорія(ї)',
    'activities': 'Вид(и) діяльності',
    'banner_image': 'Зображення для банера',
    'logo_image': 'Логотип',
    'common_info': 'Інформація про компанію',
    'is_registered': 'Зареєстрована компанія',
    'is_startup': 'Стартап проект, який шукає інвестиції',
};

const ERRORS = {
    name: {
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

const TEXT_AREA_MAX_LENGTH = 2000;
const BANNER_IMAGE_SIZE = 5 * 1024 * 1024;
const LOGO_IMAGE_SIZE = 1 * 1024 * 1024;

const fetcher = (...args) => fetch(...args).then(res => res.json());

const GeneralInfo = (props) => {
    const { user } = useAuth();
    const { profile: mainProfile, mutate: profileMutate } = useProfile();
    const [profile, setProfile] = useState(props.profile);
    const [formStateErr, setFormStateErr] = useState(ERRORS);
    const [bannerImage, setBannerImage] = useState(props.profile.banner_image);
    const [logoImage, setLogoImage] = useState(props.profile.logo_image);
    const [bannerImageError, setBannerImageError] = useState(null);
    const [logoImageError, setLogoImageError] = useState(null);
    const [edrpouError, setEdrpouError] = useState(null);
    const [companyTypeError, setCompanyTypeError] = useState(null);

    const { data: fetchedRegions, isLoading: isRegionLoading } = useSWR(`${process.env.REACT_APP_BASE_API_URL}/api/regions/`, fetcher);
    const { data: fetchedActivities, isLoading: isActivitiesLoading } = useSWR(`${process.env.REACT_APP_BASE_API_URL}/api/activities/`, fetcher);
    const { data: fetchedCategories, isLoading: isCategoriesLoading } = useSWR(`${process.env.REACT_APP_BASE_API_URL}/api/categories/`, fetcher);

    const { setFormIsDirty } = useContext(DirtyFormContext);

    // TODO: update default values as new fields added

    const fields = {
        'name': {defaultValue: mainProfile?.name},
        'official_name': {defaultValue: mainProfile?.official_name ?? null},
        'edrpou': {defaultValue: mainProfile?.edrpou ?? null},
        'region': {defaultValue: mainProfile?.region ?? null},
        'categories': {defaultValue: mainProfile?.categories ?? [], type: 'array'},
        'activities': {defaultValue: mainProfile?.activities ?? [], type: 'array'},
        'banner_image': {defaultValue: mainProfile?.banner_image ?? null},
        'logo_image': {defaultValue: mainProfile?.logo_image ?? null},
        'common_info': {defaultValue: mainProfile?.common_info ?? null},
        'is_registered': {defaultValue: mainProfile?.is_registered ?? ''},
        'is_startup': {defaultValue: mainProfile?.is_startup ?? ''},
    };

    useEffect(() => {
        const isDirty = checkFormIsDirty(fields, null, profile);
        setFormIsDirty(isDirty);
      }, [mainProfile, profile]);

    useEffect(() => {
        props.currentFormNameHandler(props.curForm);
    }, []);

    const checkRequiredFields = () => {
        let isValid = true;
        const newFormState = {};
        for (const key in profile) {
            if (key in ERRORS && (!profile[key] || (Array.isArray(profile[key]) && profile[key].length === 0))) {
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
        if (profile.edrpou && profile.edrpou.toString().length !== 8) {
            isValid = false;
        }
        if (!profile.is_registered && !profile.is_startup) {
            isValid = false;
        }
        if (bannerImageError || logoImageError) {
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

    const onChangeCheckbox = (e) => {
      const isAnyChecked =
        (profile.is_registered && e.target.name === 'is_startup') ||
        (profile.is_startup && e.target.name === 'is_registered') ||
        e.target.checked;
      if (!isAnyChecked) {
        setCompanyTypeError('Оберіть тип компанії, яку Ви представляєте');
      } else {
        setCompanyTypeError(null);
      }
      setProfile((prevState) => {
        return { ...prevState, [e.target.name]: e.target.checked };
      });
    };

    const onUpdateTextAreaField = e => {
        if (e.target.value.length <= TEXT_AREA_MAX_LENGTH)
            setProfile((prevState) => {
                return { ...prevState, [e.target.name]: e.target.value };
            });
    };

    const onUpdateSelectField = e => {
        const selectName = e.target.name;

        if (selectName === 'activities') {
            let selectedActivities = [];
            for (let activity of e.target.value) {
                let item = fetchedActivities.find((el) => el.name === activity);
                if (item) {
                    selectedActivities.push({ id: item.id, name: activity });
                }
            }
            setProfile((prevState) => {
                return { ...prevState, [selectName]: selectedActivities };
            });
        } else {
            let selectedCategories = [];
            for (let category of e.target.value) {
                let item = fetchedCategories.find((el) => el.name === category);
                if (item) {
                    selectedCategories.push({ id: item.id, name: category });
                }
            }
            setProfile((prevState) => {
                return { ...prevState, [selectName]: selectedCategories };
            });
        }
    };

    const uploadImage = async (url, imageKey, image) => {
        if (image instanceof File || image === '') {
            const formData = new FormData();
            formData.append(imageKey, image);
            try{
                const response = await axios.put(url, formData);
                const data = response.data;
                profileMutate((prevState) => {
                    return { ...prevState, [imageKey]: data[imageKey] };
                });
                setProfile((prevState) => {
                    return { ...prevState, [imageKey]: data[imageKey] };
                });
                if (imageKey === 'banner_image') {
                    setBannerImage(data.banner_image);
                } else {
                    setLogoImage(data.logo_image);
                }
                data[imageKey] === null
                    ? toast.success(imageKey === 'banner_image' ? 'Банер видалено з профілю' : 'Логотип видалено з профілю')
                    : toast.success(imageKey === 'banner_image' ? 'Банер успішно додано у профіль' : 'Логотип успішно додано у профіль');
            } catch (error) {
                console.error('Error uploading image:', error.response.data);
                error.response.status !== 401 && toast.error('Не вдалося завантажити банер/лого, сталася помилка');
            }
        }
    };

    const checkMaxImageSize = (name, image) => {
        const maxSize = name === 'banner_image' ? BANNER_IMAGE_SIZE : LOGO_IMAGE_SIZE;
        if (image.size > maxSize) {
            name === 'banner_image' && setBannerImageError('Максимальний розмір файлу 5 Mb');
            name === 'logo_image' && setLogoImageError('Максимальний розмір файлу 1 Mb');
        } else {
            name === 'banner_image' && setBannerImageError(null);
            name === 'logo_image' && setLogoImageError(null);
            return true;
        }
    };

    const onUpdateImageField = (e) => {
        const file = e.target.files[0];
        e.target.value = '';
        const imageUrl = URL.createObjectURL(file);
        if (file && checkMaxImageSize(e.target.name, file)) {
            e.target.name === 'banner_image' && setBannerImage(file);
            e.target.name === 'logo_image' && setLogoImage(file);
            setProfile((prevState) => {
                const newState = { ...prevState, [e.target.name]: imageUrl };
                return newState;
            });
        }
    };

    const deleteImageHandler = (name) => {
        name === 'logo_image' ? setLogoImage('') : setBannerImage('');
        setProfile((prevState) => {
            const newState = { ...prevState, [name]: '' };
            return newState;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (checkRequiredFields()) {
            try {
                const response = await axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${user.profile_id}`, {
                    name: profile.name,
                    official_name: profile.official_name,
                    edrpou: profile.edrpou,
                    region: profile.region,
                    common_info: profile.common_info,
                    is_startup: profile.is_startup,
                    is_registered: profile.is_registered,
                    activities: profile.activities.map(obj => obj.id),
                    categories: profile.categories.map(obj => obj.id),
                });

                profileMutate(response.data);
                toast.success('Зміни успішно збережено');
                setFormIsDirty(false);

                await uploadImage(`${process.env.REACT_APP_BASE_API_URL}/api/banner/${user.profile_id}/`, 'banner_image', bannerImage);
                await uploadImage(`${process.env.REACT_APP_BASE_API_URL}/api/logo/${user.profile_id}/`, 'logo_image', logoImage);

            } catch (error) {
                if (error.response.status === 400 ) {
                    const errorData = error.response.data;
                    if (errorData.edrpou && errorData.edrpou[0] === 'profile with this edrpou already exists.') {
                        toast.error('Компанія з таким ЄДРПОУ вже існує');
                    } else {
                        toast.error('Не вдалося зберегти зміни, сталася помилка');
                    }
                }
                console.error('Помилка:', error.response.data);
                error.response.status !== 401 && toast.error('Не вдалося зберегти зміни, сталася помилка');
            }
        }
    };

    return (
        <div className={css['form__container']}>
            {(user && profile && mainProfile)
                ?
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
                            {isActivitiesLoading
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
                                    error={formStateErr['activities']['error']
                                        ?
                                        formStateErr['activities']['message']
                                        :
                                        null}
                                />
                            }
                            {isCategoriesLoading
                                ?
                                <Loader />
                                :
                                <MultipleSelectChip
                                    name="categories"
                                    options={fetchedCategories}
                                    label={LABELS.categories}
                                    updateHandler={onUpdateSelectField}
                                    requredField={true}
                                    value={profile.categories.map(obj => obj.name) ?? ''}
                                    defaultValue="Оберіть"
                                    error={formStateErr['categories']['error']
                                        ?
                                        formStateErr['categories']['message']
                                        :
                                        null}
                                />
                            }
                        </div>
                        <ImageField
                            accept="image/png, image/jpeg"
                            inputType="file"
                            name="banner_image"
                            label={LABELS.banner_image}
                            updateHandler={onUpdateImageField}
                            requredField={false}
                            value={profile.banner_image ?? ''}
                            error={bannerImageError}
                            onDeleteImage={deleteImageHandler}
                        />
                        <ImageField
                            accept="image/png, image/jpeg"
                            inputType="file"
                            name="logo_image"
                            label={LABELS.logo_image}
                            updateHandler={onUpdateImageField}
                            requredField={false}
                            value={profile.logo_image ?? ''}
                            error={logoImageError}
                            onDeleteImage={deleteImageHandler}
                        />
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
                            error={companyTypeError}
                            requredField={true}
                        />
                    </div>
                </form>
                : <Loader />}
        </div>
    );
};

export default GeneralInfo;

GeneralInfo.propTypes = {
    profile: PropTypes.shape({
        name: PropTypes.string.isRequired,
        official_name: PropTypes.string,
        edrpou: PropTypes.string,
        region: PropTypes.string,
        common_info: PropTypes.string,
        is_registered: PropTypes.bool,
        is_startup: PropTypes.bool,
        categories: PropTypes.array,
        activities: PropTypes.array,
    }).isRequired,
    currentFormNameHandler: PropTypes.func,
    curForm: PropTypes.string,
  };
