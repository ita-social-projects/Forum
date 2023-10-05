import css from './ProfilePage.module.css';
import Description from './ProfilePageComponents/Description';
import ProfileContent from './ProfilePageComponents/ProfileContent';
import { useState } from 'react';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import axios from 'axios';
import { useEffect } from 'react';
import Loader from '../loader/Loader';

const ProfilePage = () => {
    const authToken = localStorage.getItem('Token');
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
            })
                .then((res) => {
                    setMainProfile(res.data);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        }

    }, [backUser]);


    const userInfoUpdateHandler = (myUser, myProfile) => {
        if ((myUser.name != backUser.name) || (myUser.surname != backUser.surname)) {
            axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/auth/users/me/`, {
                name: myUser.name,
                surname: myUser.surname,
            })
                .then(response => {
                    setBackUser(response.data);
                })
                .catch(error => console.error(error));
        }

        if (myProfile.person_position != mainProfile.person_position) {
            axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${backUser.profile_id}`, {
                person_position: myProfile.person_position,
            })
                .then(response => {
                    setMainProfile(response.data);
                })
                .catch(error => console.error(error));
        }
    };

    const generalInfoUpdateHandler = (myProfile) => {
        axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${backUser.profile_id}`, {
            name: myProfile.name,
            official_name: myProfile.official_name,
            region: myProfile.region,
            edrpou: myProfile.edrpou,
            common_info: myProfile.common_info,
            is_startup: myProfile.is_startup,
            is_registered: myProfile.is_registered,
            // activities: myProfile.activities,
        })
            .then(response => {
                console.log(response.data);
                setMainProfile(response.data);
            })
            .catch(error => console.error(error));
    };

    const contactInfoUpdateHandler = (myProfile) => {
        axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${backUser.profile_id}`, {
            phone: myProfile.phone,
            address: myProfile.address,
        })
            .then(response => {
                console.log(response.data);
                setMainProfile(response.data);
            })
            .catch(error => console.error(error));
    };

    const productServiceInfoUpdateHandler = (myProfile) => {
        axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${backUser.profile_id}`, {
            service_info: myProfile.service_info,
            product_info: myProfile.product_info,
        })
            .then(response => {
                console.log(response.data);
                setMainProfile(response.data);
            })
            .catch(error => console.error(error));
    };

    const additionalInfoUpdateHandler = (myProfile) => {
        axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${backUser.profile_id}`, {
            founded: myProfile.founded,
        })
            .then(response => {
                console.log(response.data);
                setMainProfile(response.data);
            })
            .catch(error => console.error(error));
    };

    const startupInfoUpdateHandler = (myProfile) => {
        axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${backUser.profile_id}`, {
            startup_idea: myProfile.startup_idea,
        })
            .then(response => {
                console.log(response.data);
                setMainProfile(response.data);
            })
            .catch(error => console.error(error));
    };

    return (
        <div className={css['container']}>
            <BreadCrumbs currentPage="Профіль" />
            {isLoading
                ? <Loader />
                :
                <>
                    <Description companyName={mainProfile.name} formName={formName} />
                    <ProfileContent
                        user={backUser}
                        profile={mainProfile}
                        onUserInfoUpdate={userInfoUpdateHandler}
                        onGeneralInfoUpdate={generalInfoUpdateHandler}
                        onContactInfoUpdate={contactInfoUpdateHandler}
                        onProductServiceInfoUpdate={productServiceInfoUpdateHandler}
                        onAdditionalInfoUpdate={additionalInfoUpdateHandler}
                        onStartupInfoUpdate ={startupInfoUpdateHandler}
                        currentFormNameHandler={currentFormNameHandler}
                        formName={formName} />
                </>}
        </div>
    );
};

export default ProfilePage;
