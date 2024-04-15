import { Tooltip } from 'antd';
import { PropTypes } from 'prop-types';
import { Link, NavLink, Route, Routes, useBlocker } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DirtyFormContext } from  '../../../context/DirtyFormContext';
import AdditionalInfo from '../FormComponents/AdditionalInfo';
import ContactsInfo from '../FormComponents/ContactsInfo';
import DeleteProfilePage from '../FormComponents/DeleteProfileComponent/DeleteProfilePage';
import GeneralInfo from '../FormComponents/GeneralInfo';
import ProductServiceInfo from '../FormComponents/ProductServiceInfo';
import StartupInfo from '../FormComponents/StartupInfo';
import UserInfo from '../FormComponents/UserInfo';
import ProfileFormButton from '../UI/ProfileFormButton/ProfileFormButton';
import MyModal from '../UI/MyModal/MyModal';
import WarnUnsavedDataModal from '../FormComponents/WarnUnsavedDataModal';
import ChangePassword from '../FormComponents/ChangePassword';
import css from './ProfileContent.module.css';


const INFOLINKS = [
    {
        title: 'Інформація про користувача',
        link: '/user-info',
    },
    {
        title: 'Загальна інформація',
        link: '/general-info',
    },
    {
        title: 'Контакти',
        link: '/contacts',
    },
    {
        title: 'Інформація про товари/ послуги',
        link: '/products-service-info',
        tooltipText: 'Цей розділ доступний, коли обрано опцію "Зареєстрована компанія" у розділі Загальна інформація'
    },
    {
        title: 'Додаткова інформація',
        link: '/additional-info',
        tooltipText: 'Цей розділ доступний, коли обрано опцію "Зареєстрована компанія" у розділі Загальна інформація'
    },
    {
        title: 'Стартап',
        link: '/startup',
        tooltipText: 'Цей розділ доступний, коли обрано опцію "Стартап проект" у розділі Загальна інформація'
    },
];

const FORM_NAMES = [
    'UserInfo',
    'GeneralInfo',
    'ContactsInfo',
    'ProductServiceInfo',
    'AdditionalInfo',
    'StartupInfo',
    'Delete',
    'ChangePassword'
];

const ProfileContent = (props) => {

    const tooltipInnerContentStyles = {
            display: 'flex',
            borderRadius: '2px',
            background: 'var(--main-grey-90, #25292C)',
            color: 'var(--main-white, #FFF)',
            fontFeatureSettings: 'calt',
            fontFamily: 'Inter',
            letterSpacing: '-0.14px',
    };

    const [modal, setModal] = useState(false);
    const [formIsDirty, setFormIsDirty] = useState(false);
    const blocker = useBlocker(
        ({ currentLocation, nextLocation }) =>
          formIsDirty &&
          currentLocation.pathname !== nextLocation.pathname
      );

    useEffect(() => {
        if (blocker.state === 'blocked') {
            setModal(true);
        } else {
            setModal(false);
        }
    }, [blocker.state]);

    const confirmNavigation = () => {
        setFormIsDirty(false);
        blocker.proceed();
        setModal(false);
      };

    const cancelNavigation = () => {
        blocker.reset();
        setModal(false);
      };

    useEffect (() => {
        const onBeforeUnload = (e) => {
            if (formIsDirty) {
              e.preventDefault();
              e.returnValue = '';
            }
          };
          window.addEventListener('beforeunload', onBeforeUnload);
          return () => {
            window.removeEventListener('beforeunload', onBeforeUnload);
          };
        }, [formIsDirty]);

    return (
        <div className={css['content__container']}>
            <div className={css['content']}>
                <div className={css['info-links-profile']}>
                {INFOLINKS.map((element) => {
                    const isLinkEnabled =
                        (props.profile.is_registered && props.profile.is_startup) ||
                        (props.profile.is_registered && element.title !== 'Стартап') ||
                        (props.profile.is_startup && element.title !== 'Інформація про товари/ послуги' && element.title !== 'Додаткова інформація');
                    return isLinkEnabled ? (
                        <NavLink
                            className={({ isActive }) => (`${css['infolink']} ${isActive && css['infolink__active']}`)}
                            to={`/profile${element.link}`}
                            key={element.title}
                        >
                            {element.title}
                        </NavLink>
                    ) : (
                        <Tooltip
                            key={element.title}
                            placement="bottomLeft"
                            title={element.tooltipText}
                            overlayInnerStyle={tooltipInnerContentStyles}
                        >
                                <NavLink
                                    className={`${css['infolink']} ${css['infolink__disabled']}`}
                                    key={element.title}
                                    disabled
                                >
                                    {element.title}
                                </NavLink>
                        </Tooltip>
                    );
                })}
                    <div className={css['divider']}></div>
                    <Link
                        to="/profile/change-password"
                        className={`${css['infolink']}`}>
                        Змінити пароль
                    </Link>
                    <Link
                        to="/profile/delete"
                        className={`${css['infolink']} ${css['delete']}`}>
                        Видалити профіль
                    </Link>
                </div>
                <DirtyFormContext.Provider value={{ formIsDirty, setFormIsDirty }}>
                    <Routes>
                        <Route
                            path="/delete"
                            element={<DeleteProfilePage
                                currentFormNameHandler={props.currentFormNameHandler}
                                curForm={FORM_NAMES[6]} />} />
                        <Route
                            path="/user-info"
                            element={<UserInfo user={props.user}
                                profile={props.profile}
                                currentFormNameHandler={props.currentFormNameHandler}
                                curForm={FORM_NAMES[0]} />} />
                        <Route
                            path="/general-info"
                            element={<GeneralInfo
                                profile={props.profile}
                                currentFormNameHandler={props.currentFormNameHandler}
                                curForm={FORM_NAMES[1]} />} />
                        <Route path="/contacts"
                            element={<ContactsInfo
                                profile={props.profile}
                                currentFormNameHandler={props.currentFormNameHandler}
                                curForm={FORM_NAMES[2]} />} />
                        <Route
                            path="/products-service-info"
                            element={<ProductServiceInfo
                                profile={props.profile}
                                currentFormNameHandler={props.currentFormNameHandler}
                                curForm={FORM_NAMES[3]} />} />
                        <Route
                            path="/additional-info"
                            element={<AdditionalInfo
                                profile={props.profile}
                                currentFormNameHandler={props.currentFormNameHandler}
                                curForm={FORM_NAMES[4]} />} />
                        <Route
                            path="/startup"
                            element={<StartupInfo
                                profile={props.profile}
                                currentFormNameHandler={props.currentFormNameHandler}
                                curForm={FORM_NAMES[5]} />} />
                        <Route
                            path="/change-password"
                            element={<ChangePassword
                                profile={props.user}
                                currentFormNameHandler={props.currentFormNameHandler}
                                curForm={FORM_NAMES[7]} />} />
                    </Routes>
                </DirtyFormContext.Provider>
            </div>

            {props.formName !== 'Delete' && <ProfileFormButton formName={props.formName} />}

            {blocker.state === 'blocked' &&
                (
                <MyModal visible={modal} setVisisble={setModal}>
                    <WarnUnsavedDataModal onCancel={cancelNavigation} onConfirm={confirmNavigation} />
                </MyModal>)
            }

        </div>
    );
};

export default ProfileContent;

ProfileContent.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        surname: PropTypes.string.isRequired,
        profile_id: PropTypes.number.isRequired,
    }).isRequired,
    profile: PropTypes.shape({
        name: PropTypes.string.isRequired,
        official_name: PropTypes.string,
        edrpou: PropTypes.string,
        region: PropTypes.string,
        common_info: PropTypes.string,
        phone: PropTypes.string,
        address: PropTypes.string,
        phounded: PropTypes.number,
        person_position: PropTypes.string,
        startup_idea: PropTypes.string,
        product_info: PropTypes.string,
        service_info: PropTypes.string,
        is_registered: PropTypes.bool,
        is_startup: PropTypes.bool,
        categories: PropTypes.array,
        activities: PropTypes.array,
    }).isRequired,
    currentFormNameHandler: PropTypes.func,
    formName: PropTypes.string,
  };