import css from './ProfilePage.module.css';
import Description from './ProfilePageComponents/Description';
import ProfileContent from './ProfilePageComponents/ProfileContent';
import { useState } from 'react';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import useSWR from 'swr';

const USER = {
    'email': 'ex@gmail.com',
    'companyEmail': '',    
    'password': '12345678',
    'confirmPassword': '12345678',
    'surname': 'Василенко',
    'name': 'Тарас',
    'companyName': ' Назва Компанії',
    'companyCheckbox': true,
    'startupCheckbox': false,
    'rulesAgreement': true,
    'position': '',
    'brend': '',
    'companyOfficialName': '',
    'edrpou': '',
    'activities': [],
    'categories': [],
    'regions': '',
    'bannerImage': '',
    'logo': '',    
    'slogan': '',
    'companyInfo': '',
    'productInfo': '',
    'serviceInfo': '',
    'logisticProductService': '',
    'cooperationFormat': '',
    'competitiveAdvantage': '',  
    'foundationYear': '',
    'companySize': '',
    'topClients': '',
    'passedAudit': '',  
    'startupName': '',
    'investmentAmount': '',
    'cooperationGoals': [],
    'endResult': '',
    'competitiveAdvantageIdea': '',
    'risks': '',
    'searchPartners': '',
    'startupIdea': '' ,
    'phoneNumber': '',
    'companySite': '',
    'address': '',
    'Facebook': '',
    'Instagram': '',
    'Tiktok': '',
    'LinkedIn': '',
    'Youtube': '',               
};

// const fetcher = (...args) => fetch(...args).then(res => res.json());
const fetcher = async (url, token) => {
    const headers = {
      Authorization: `Token ${token}`,
    };
    const response = await fetch(url, { headers });
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

const ProfilePage = () => {
    const [mainUser, setMainUser] = useState(USER);
    const [formName, setFormName] = useState('');
    const currentFormNameHandler = (currentName) => {
        setFormName(currentName);
    };

    const token = '661d6d53d89502c80fbb3d0408c302e81364a8a3';
    const { data, error } = useSWR(['http://127.0.0.1:8000/api/profiles/1', token], ([url, token]) => fetcher(url, token))

    console.log('in app', data);


    const profileUpdateHandler = (myUser) => {
        console.log('in app');
        console.log(myUser);
        setMainUser((prev) => {
            return {...prev, ...myUser}
        });
    };
    return (
        <div className={css['container']}>
            <BreadCrumbs currentPage='Профіль'/>
            <Description companyName={mainUser.companyName} brend={mainUser.brend} formName={formName}/>
            <ProfileContent user={mainUser} onUpdate={profileUpdateHandler} currentFormNameHandler={currentFormNameHandler} formName={formName}/>
        </div>
    );
};

export default ProfilePage;
