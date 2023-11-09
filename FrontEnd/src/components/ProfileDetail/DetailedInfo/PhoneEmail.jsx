import { useState } from 'react';
import useSWR from 'swr';
import { useUser } from '../../../hooks';
import { PropTypes } from 'prop-types';
import classes from './PhoneEmail.module.css';

function PhoneEmail ({ profileId, personId }) {
    const [isPhoneShown, setPhoneShown] = useState(false);
    const [isEmailShown, setEmailShown] = useState(false);
    const authToken = localStorage.getItem('Token');
    const { user } = useUser();

    const { data: profileData } = useSWR(
      `${process.env.REACT_APP_BASE_API_URL}/api/profiles/${profileId}?with_contacts=True`,
      (url) =>
        fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `Token ${authToken}`,
          },
        })
          .then((res) => {
            if (!res.ok && res.status === 401) {
              const error = new Error('Unauthorized user');
              error.info = res.json();
              error.status = res.status;
              throw error;
            }
            return res.json();
          })
          .catch((error) => {
            if (error.status === 401) {
              console.error(error);
            }
          })
    );

    const urlViewed = `${process.env.REACT_APP_BASE_API_URL}/api/viewed-list/`;
    const viewedData = user && {user: user.id, company: profileId,};

    async function addToViewed(url, data ) {
        return fetch(url, {
          method: 'POST',
          headers: {
            Authorization: `Token ${authToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }).then();
    }

    const handlePhoneClick = async () => {
        setPhoneShown(true);
        try {
            await addToViewed(
                urlViewed,
                viewedData
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleEmailClick = async () => {
        setEmailShown(true);
        try {
            await addToViewed(
                urlViewed,
                viewedData
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
            <>
              {profileData && profileData.phone ? (
                <div className={classes['data-block__field']}>
                    <p className={classes['data-block__field--title']}>Телефон</p>
                    {(isPhoneShown || user && user.id === personId) ?
                    (
                    <p className={classes['data-block__field--phone']}>{profileData.phone}</p> ) : (
                    <button type="button" onClick={handlePhoneClick} className={classes['data-block__field--show--phone']}>
                            Показати телефон
                    </button>
                    )}
                </div>
              ) : null }
              {profileData && profileData.email ? (
                <div className={classes['data-block__field']}>
                    <p className={classes['data-block__field--title']}>Електронна пошта</p>
                    {(isEmailShown || user && user.id === personId) ? (
                    <p className={classes['data-block__field--email']}>{profileData.email}</p> ) : (
                    <button type="button" onClick={handleEmailClick} className={classes['data-block__field--show--email']}>Показати ел. пошту</button>
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
