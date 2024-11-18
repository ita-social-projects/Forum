import css from './ProfilePage.module.css';
import Description from './ProfilePageComponents/Description';
import ProfileContent from './ProfilePageComponents/ProfileContent';
import { useState, useEffect } from 'react';
import { DirtyFormContext } from '../../context/DirtyFormContext';
import Loader from '../../components/Loader/Loader';
import { useAuth, useProfile } from '../../hooks';
import useWindowWidth from '../../hooks/useWindowWidth';
import EditProfileMobile from './Mobile/EditProfileMobile';

const ProfilePage = () => {
  const [formIsDirty, setFormIsDirty] = useState(false);
  const { user } = useAuth();
  const { profile } = useProfile();
  const windowWidth = useWindowWidth();

  useEffect(() => {
    const onBeforeUnload = (e) => {
      if (formIsDirty) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
  }, [formIsDirty]);


  if (windowWidth < 768) {
    return (
      <DirtyFormContext.Provider value={{ formIsDirty, setFormIsDirty }}>
        <EditProfileMobile/>
      </DirtyFormContext.Provider>
    );
  }

  return (
    <div className={css['container']}>
      <DirtyFormContext.Provider value={{ formIsDirty, setFormIsDirty }}>
        {!profile ? (
          <Loader />
        ) : (
          <>
            <Description
              companyName={profile.name}
              companyLogo={profile?.logo?.path}
            />
            <ProfileContent
              user={user}
              profile={profile}
            />
          </>
        )}
      </DirtyFormContext.Provider>
    </div >
  );
};

export default ProfilePage;
