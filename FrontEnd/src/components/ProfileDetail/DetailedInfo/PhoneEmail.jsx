import axios from 'axios';
import { useState } from 'react';
import useSWR from 'swr';
import { useAuth } from '../../../hooks';
import { PropTypes } from 'prop-types';
import classes from './PhoneEmail.module.css';

function PhoneEmail ({ profileId, personId }) {
    const [isContactsShown, setContactsShown] = useState(false);
    const { user } = useAuth();

    const { data: profileData } = useSWR(
      `${process.env.REACT_APP_BASE_API_URL}/api/profiles/${profileId}?with_contacts=True`,
      (url) => axios.get(url)
        .then(res => res.data)
        .catch((error) => {
          console.error('Cannot get profile contact data', error);
        })
    );

    const urlViewed = `${process.env.REACT_APP_BASE_API_URL}/api/company-view/${profileId}/`;

    async function addToViewed(url) {
        return axios.post(url);
    }

    const handleContactsClick = async () => {
        setContactsShown(true);
        try {
            await addToViewed(
                urlViewed
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
      <>
        {profileData && (profileData.phone || profileData.email) ? (
              <div className={classes['data-block__field']}>
                <p className={classes['data-block__field--title']}>Контакти</p>
                {isContactsShown || (user && user.id === personId) ? (
                  <div className={classes['data-block__field--contacts']}>
                    <p>{profileData.phone}</p>
                    <p>{profileData.email}</p>
                  </div>
                  ) : (
                  <button type="button" onClick={handleContactsClick} className={classes['data-block__field--show--contacts']}>
                    Показати контакти
                  </button>
                )}
              </div>
        ) : null}
      </>
    );
}

export default PhoneEmail;

PhoneEmail.propTypes = {
    profileId: PropTypes.number.isRequired,
    personId: PropTypes.number,
  };
