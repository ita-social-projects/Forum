import css from './ProfileContent.module.css';
import { Link, NavLink, Route, Routes, Navigate } from 'react-router-dom';

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
        title: "Інформація про користувача",
        link: "/user-info",
        element: UserInfo,
    },
    {
        title: "Загальна інформація",
        link: "/general-info",
        element: GeneralInfo,
    },
    {
        title: "Контакти",
        link: "/contacts",
        element: ContactsInfo,
    },
    {
        title: "Інформація про товари/ послуги",
        link: "/products-service-info",
        element: ProductServiceInfo,
    },
    {
        title: "Додаткова інформація",
        link: "/additional-info",
        element: AdditionalInfo,
    },
    {
        title: "Стартап",
        link: "/startup",
        element: StartupInfo,
    },
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
                    <Link to='/profile/delete' className={`${css['infolink']} ${css['delete']}`}>Видалити профіль</Link>
                </div>

                <Routes>
                    <Route path="/" element={<Navigate to="/profile/user-info" replace />} />
                    <Route path="/delete" element={<DeleteProfilePage user={props.user} CurrentFormNameHandler={props.CurrentFormNameHandler}/>} />

                    <Route path="/user-info" element={<UserInfo user={props.user} onUpdate={props.onUpdate} CurrentFormNameHandler={props.CurrentFormNameHandler}/>}  />
                    <Route path="/general-info" element={<GeneralInfo user={props.user} onUpdate={props.onUpdate} CurrentFormNameHandler={props.CurrentFormNameHandler}/>}/>
                    <Route path="/products-service-info" element={<ProductServiceInfo user={props.user} onUpdate={props.onUpdate} CurrentFormNameHandler={props.CurrentFormNameHandler}/>}/>
                    <Route path="/additional-info" element={<AdditionalInfo user={props.user} onUpdate={props.onUpdate} CurrentFormNameHandler={props.CurrentFormNameHandler}/>}/>
                    <Route path="/startup" element={<StartupInfo user={props.user} onUpdate={props.onUpdate} CurrentFormNameHandler={props.CurrentFormNameHandler}/>}/>
                    <Route path="/contacts" element={<ContactsInfo user={props.user} onUpdate={props.onUpdate} CurrentFormNameHandler={props.CurrentFormNameHandler}/>} />
                </Routes>
            </div>

            {props.formName !== 'Delete' && <ProfileFormButton formName={props.formName}/>}
        </div>
    );
};

export default ProfileContent;