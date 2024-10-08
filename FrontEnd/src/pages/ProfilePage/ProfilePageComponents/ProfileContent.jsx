import { Tooltip } from 'antd';
import { PropTypes } from 'prop-types';
import { Link, NavLink, Route, Routes, useBlocker } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { DirtyFormContext } from '../../../context/DirtyFormContext';
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
import tooltipInnerContentStyles from '../../CustomThemes/customProfileTooltipThemes';
import INFOLINKS from './TextInfoLinks';
import FORM_NAMES from './TextFormNames';


const ProfileContent = (props) => {
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

    useEffect(() => {
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
        <div className={css['profile__main']}>
            <div className={css['profile__content']}>
                <div className={css['profile__info-links']}>
                    {INFOLINKS.map((element) => {
                        const isLinkEnabled =
                            (props.profile.is_registered && props.profile.is_startup) ||
                            (props.profile.is_registered && element.title !== 'Стартап') ||
                            (props.profile.is_startup && element.title !== 'Інформація про товари/ послуги'
                                && element.title !== 'Додаткова інформація');
                        return isLinkEnabled ? (
                            <NavLink
                                className={({ isActive }) =>
                                    (`${css['profile__infolink']} ${isActive && css['profile__infolink-active']}`)}
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
                                    className={`${css['profile__infolink']} ${css['profile__infolink-disabled']}`}
                                    key={element.title}
                                    disabled
                                >
                                    {element.title}
                                </NavLink>
                            </Tooltip>
                        );
                    })}
                    <div className={css['profile__divider']}></div>
                    <Link
                        to="/profile/change-password"
                        className={`${css['profile__infolink']}`}>
                        Змінити пароль
                    </Link>
                    <Link
                        to="/profile/delete"
                        className={`${css['profile__infolink']} ${css['profile__delete']}`}>
                        Видалити профіль
                    </Link>
                </div>
                <DirtyFormContext.Provider value={{ formIsDirty, setFormIsDirty }}>
                    <Routes>
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
                            path="/delete"
                            element={<DeleteProfilePage
                                currentFormNameHandler={props.currentFormNameHandler}
                                curForm={FORM_NAMES[6]} />} />
                        <Route
                            path="/change-password"
                            element={<ChangePassword
                                user={props.user}
                                currentFormNameHandler={props.currentFormNameHandler}
                                curForm={FORM_NAMES[7]} />} />
                    </Routes>
                </DirtyFormContext.Provider>
            </div>
                {props.formName !== 'Delete' && <ProfileFormButton formName={props.formName} formState={formIsDirty} />}

                {blocker.state === 'blocked' &&
                    (
                        <MyModal visible={modal}>
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
