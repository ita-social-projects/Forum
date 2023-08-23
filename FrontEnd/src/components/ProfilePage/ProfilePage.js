import css from './ProfilePage.module.css';
import Description from './ProfilePageComponents/Description';
import ProfileContent from './ProfilePageComponents/ProfileContent';
import { useState } from 'react';

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
    'companyOfficialName': '',
    'edrpou': '',
    'activities': [],
    'categories': [],
    'regions': [],
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

const ProfilePage = () => {
    const [mainUser, setMainUser] = useState(USER);

    const ProfileUpdateHandler = (myUser) => {
        console.log('in app');
        console.log(myUser);
        setMainUser((prev) => {
            return {...prev, ...myUser}
        });
    };
    
    return (
        <div className={css['container']}>
            <Description companyName={mainUser.companyName} />
            <ProfileContent user={mainUser} onUpdate={ProfileUpdateHandler}/>
        </div>
    );
};

export default ProfilePage;