import css from './ProfilePage.module.css';
import Description from './ProfilePageComponents/Description';
import ProfileContent from './ProfilePageComponents/ProfileContent';
import { useState } from 'react';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import { useAuth } from "../../hooks/";
import axios from 'axios';
import { useEffect } from 'react';


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
    'startupIdea': '',
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
    const authToken = localStorage.getItem("Token");
    const [mainUser, setMainUser] = useState(USER);

    const [backUser, setBackUser] = useState(null);
    const [mainProfile, setMainProfile] = useState(null);
    const [formName, setFormName] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const currentFormNameHandler = (currentName) => {
        setFormName(currentName);
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/auth/users/me`, {
            headers: {
                'Authorization': `token ${authToken}`
            }
        })
            .then((res) => {
                setBackUser(res.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (backUser) {
            axios.get(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${backUser.profile_id}`, {
                headers: {
                    'Authorization': `token ${authToken}`
                }
            })
                .then((res) => {
                    setMainProfile(res.data);
                })
                .catch((error) => {
                    console.error(error);
                })
                .finally(() => {
                    setIsLoading(false); 
                });
        }

    }, [backUser]);

    
    const profileUpdateHandler = (myUser) => {
        console.log('in app');
        console.log(myUser);
        setMainUser((prev) => {
            return { ...prev, ...myUser }
        });
    };
    return (
        <div className={css['container']}>
            <BreadCrumbs currentPage='Профіль' />
            {isLoading
                ? <div>Loading...</div>
                :
                <>
            <Description companyName={mainProfile.name} formName={formName} />
            <ProfileContent user={mainUser} onUpdate={profileUpdateHandler} currentFormNameHandler={currentFormNameHandler} formName={formName} />
            </>}
        </div>
    );
};

export default ProfilePage;
