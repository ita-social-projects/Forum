import css from './ProfilePage.module.css';
import Description from './ProfilePageComponents/Description';
import ProfileContent from './ProfilePageComponents/ProfileContent';
import { useState } from 'react';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import Loader from '../loader/Loader';
import { useUser, useProfile } from '../../hooks/';


const ProfilePage = () => {
    const { user } = useUser();
    const { profile } = useProfile();
    const [formName, setFormName] = useState('');

    const currentFormNameHandler = (currentName) => {
        setFormName(currentName);
    };

    // const contactInfoUpdateHandler = (myProfile) => {
    //     axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${backUser.profile_id}`, {
    //         phone: myProfile.phone,
    //         address: myProfile.address,
    //     })
    //         .then(response => {
    //             console.log(response.data);
    //             setMainProfile(response.data);
    //         })
    //         .catch(error => console.error(error));
    // };

    // const productServiceInfoUpdateHandler = (myProfile) => {
    //     axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${backUser.profile_id}`, {
    //         service_info: myProfile.service_info,
    //         product_info: myProfile.product_info,
    //     })
    //         .then(response => {
    //             console.log(response.data);
    //             setMainProfile(response.data);
    //         })
    //         .catch(error => console.error(error));
    // };

    // const additionalInfoUpdateHandler = (myProfile) => {
    //     axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${backUser.profile_id}`, {
    //         founded: myProfile.founded,
    //     })
    //         .then(response => {
    //             console.log(response.data);
    //             setMainProfile(response.data);
    //         })
    //         .catch(error => console.error(error));
    // };

    // const startupInfoUpdateHandler = (myProfile) => {
    //     axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${backUser.profile_id}`, {
    //         startup_idea: myProfile.startup_idea,
    //     })
    //         .then(response => {
    //             console.log(response.data);
    //             setMainProfile(response.data);
    //         })
    //         .catch(error => console.error(error));
    // };

    return (
        <div className={css['container']}>
            <BreadCrumbs currentPage="Профіль" />
            {!profile
                ? <Loader />
                :
                <>
                    <Description companyName={profile.name} formName={formName} />
                    <ProfileContent
                        user={user}
                        profile={profile}
                        currentFormNameHandler={currentFormNameHandler}
                        formName={formName} />
                </>}
        </div>
    );
};

export default ProfilePage;
