import css from './ProfileContent.module.css';
import { Link, NavLink, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import AdditionalInfo from '../FormComponents/AdditionalInfo';
import ContactsInfo from '../FormComponents/ContactsInfo';
import DeleteProfilePage from '../FormComponents/DeleteProfileComponent/DeleteProfilePage';
import GeneralInfo from '../FormComponents/GeneralInfo';
import ProductServiceInfo from '../FormComponents/ProductServiceInfo';
import StartupInfo from '../FormComponents/StartupInfo';
import UserInfo from '../FormComponents/UserInfo';
import ProfileFormButton from '../UI/ProfileFormButton/ProfileFormButton';

async function getUserID(){
if(sessionStorage.getItem("isAuthenticated")){
const token  = "Token " + sessionStorage.getItem('auth_token');
const request_user = await axios.get('http://localhost:8000/api/auth/users/me/',
  {withCredentials: true,
   headers: {
         'Authorization': token}})
    .then(response => {return response.data})

const user_profile = await axios.get('http://localhost:8000/api/profiles?userid='+request_user.id,
  {withCredentials: true,
   headers: {
         'Authorization': token}})
    .then(response => {return response.data});
return user_profile
  }
}
getUserID()

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
                    <Link to='/profile/delete' className={`${css['infolink']} ${css['delete']}`}>Видалити профіль</Link>
                </div>

                <Routes>
                    <Route path="/" element={<Navigate to="/profile/user-info" replace />} />
                    <Route path="/delete" element={<DeleteProfilePage user={props.user} currentFormNameHandler={props.currentFormNameHandler} curForm={FORM_NAMES[6]} />} />
                    {INFOLINKS.map((el, index) => (
                        <Route
                            path={el.link}
                            Component={() => <el.element user={props.user} onUpdate={props.onUpdate} currentFormNameHandler={props.currentFormNameHandler} curForm={FORM_NAMES[index]}/>}
                            key={el.title}
                        />
                    ))}
                </Routes>
            </div>

            {props.formName !== 'Delete' && <ProfileFormButton formName={props.formName} />}
        </div>
    );
};

export default ProfileContent;
