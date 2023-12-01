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
