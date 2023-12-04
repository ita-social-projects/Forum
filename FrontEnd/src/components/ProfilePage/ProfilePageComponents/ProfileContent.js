import css from './ProfileContent.module.css';
import { Link, NavLink, Route, Routes } from 'react-router-dom';
import AdditionalInfo from '../FormComponents/AdditionalInfo';
import ContactsInfo from '../FormComponents/ContactsInfo';
import DeleteProfilePage from '../FormComponents/DeleteProfileComponent/DeleteProfilePage';
import GeneralInfo from '../FormComponents/GeneralInfo';
import ProductServiceInfo from '../FormComponents/ProductServiceInfo';
import StartupInfo from '../FormComponents/StartupInfo';
import UserInfo from '../FormComponents/UserInfo';
import ProfileFormButton from '../UI/ProfileFormButton/ProfileFormButton';


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
    },
    {
        title: 'Додаткова інформація',
        link: '/additional-info',
    },
    {
        title: 'Стартап',
        link: '/startup',
    },
];

const FORM_NAMES = [
    'UserInfo',
    'GeneralInfo',
    'ContactsInfo',
    'ProductServiceInfo',
    'AdditionalInfo',
    'StartupInfo',
    'Delete'
];

const ProfileContent = (props) => {
    return (
        <div className={css['content__container']}>
            <div className={css['content']}>
                <div className={css['info-links-profile']}>
                    {INFOLINKS.map((element) => (
                        <NavLink
                            className={({ isActive }) => (`${css['infolink']} ${isActive && css['infolink__active']}`)}
                            to={`/profile${element.link}`}
                            key={element.title}
                        >{element.title}</NavLink>
                    ))}
                    <div className={css['divider']}></div>
                    <Link
                        to="/profile/delete"
                        className={`${css['infolink']} ${css['delete']}`}>
                        Видалити профіль
                    </Link>
                </div>

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
                </Routes>
            </div>

            {props.formName !== 'Delete' && <ProfileFormButton formName={props.formName} />}
        </div>
    );
};

export default ProfileContent;
