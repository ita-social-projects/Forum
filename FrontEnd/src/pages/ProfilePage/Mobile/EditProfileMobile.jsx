import Accordion from './Accordion';
import AdditionalInfo from '../FormComponents/AdditionalInfo';
import ContactsInfo from '../FormComponents/ContactsInfo';
import DeleteProfilePage from '../FormComponents/DeleteProfileComponent/DeleteProfilePage';
import GeneralInfo from '../FormComponents/GeneralInfo';
import ProductServiceInfo from '../FormComponents/ProductServiceInfo';
import StartupInfo from '../FormComponents/StartupInfo';
import UserInfo from '../FormComponents/UserInfo';
import ChangePassword from '../FormComponents/ChangePassword';
import { useAuth, useProfile } from '../../../hooks';
import css from './EditProfileMobile.module.css';




const EditProfileMobile = () => {
  const { user } = useAuth();
  const { profile } = useProfile();
  const sections = [
    { title: 'Інформація про користувача', content: <UserInfo user={user} profile={profile} /> },
    { title: 'Загальна інформація', content: <GeneralInfo profile={profile} /> },
    { title: 'Контакти', content: <ContactsInfo profile={profile} /> },
    { title: 'Інформація про товари/послуги', content: <ProductServiceInfo profile={profile} /> },
    { title: 'Додаткова інформація', content: <AdditionalInfo profile={profile} /> },
    { title: 'Стартап', content: <StartupInfo profile={profile} /> },
    { title: 'Змінити пароль', content: <ChangePassword user={user} /> },
    { title: 'Видалити профіль', content: <DeleteProfilePage /> },
  ];

  return (
    <div className={css['container']}>
    <h2 className={css['head']}>Профіль користувача</h2>
      <Accordion sections={sections} />
    </div>
  );
};

export default EditProfileMobile;