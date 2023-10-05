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
            axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${myUser.profile_id}`, {
                person_position: myProfile.person_position,
            })
                .then(response => {
                    setMainProfile(response.data);
                })
                .catch(error => console.error(error));
        }
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
                        currentFormNameHandler={currentFormNameHandler}
                        formName={formName} />
                </>}
        </div>
    );
};

export default ProfilePage;
