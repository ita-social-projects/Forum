import css from './ProfilePage.module.css';
import Description from './ProfilePageComponents/Description';
import ProfileContent from './ProfilePageComponents/ProfileContent';
import { useState } from 'react';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import axios from 'axios';
import { useEffect } from 'react';


const ProfilePage = () => {
    const authToken = localStorage.getItem("Token");
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


    const userUpdateHandler = (myUser) => {
        axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/auth/users/me/`, {
            name: myUser.name,
            surname: myUser.surname,
        })
            .then(response => console.log(response.data))
            .catch(error => console.error(error));
    };

    return (
        <div className={css['container']}>
            <BreadCrumbs currentPage='Профіль' />
            {isLoading
                ? <div>Loading...</div>
                :
                <>
                    <Description companyName={mainProfile.name} formName={formName} />
                    <ProfileContent user={backUser} profile={mainProfile} onUpdate={userUpdateHandler} currentFormNameHandler={currentFormNameHandler} formName={formName} />
                </>}
        </div>
    );
};

export default ProfilePage;
