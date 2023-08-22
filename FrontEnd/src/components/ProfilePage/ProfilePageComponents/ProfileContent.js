import css from './ProfileContent.module.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import NavnarInfo from './NavnarInfo';

import AdditionalInfo from '../FormComponents/AdditionalInfo';
import ContactsInfo from '../FormComponents/ContactsInfo';
import DeleteProfilePage from '../FormComponents/DeleteProfileComponent/DeleteProfilePage';
import GeneralInfo from '../FormComponents/GeneralInfo';
import ProductServiceInfo from '../FormComponents/ProductServiceInfo';
import StartupInfo from '../FormComponents/StartupInfo';
import UserInfo from '../FormComponents/UserInfo';

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
        <div className={css['content']}>
            <NavnarInfo infolinks={INFOLINKS} />
            <Routes>
                <Route path="/" element={<Navigate to="/profile/user-info" replace />} />
                <Route path="/delete" element={<DeleteProfilePage user={props.user}/>} />
                {INFOLINKS.map((el) => (
                    <Route path={el.link} Component={() => <el.element user={props.user} onUpdate={props.onUpdate}/> }
                    key={el.title}
                    />
                ))}
            </Routes>
        </div>
    );
};

export default ProfileContent;