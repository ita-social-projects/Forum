import { useState } from 'react';
import useSWR from 'swr';
import { PropTypes } from 'prop-types';
import classes from './PhoneEmail.module.css';

function PhoneEmail ({ isAuthorized, profileId }) {
    const [isPhoneShown, setPhoneShown] = useState(false);
    const [isEmailShown, setEmailShown] = useState(false);
    const authToken = localStorage.getItem('Token');

    // TODO: change the logic of getting user.id when PR with hooks will be merged

    const { data: userData } = useSWR(
        authToken ? `${process.env.REACT_APP_BASE_API_URL}/api/auth/users/me/` : null,
        url =>
            fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${authToken}`,
                },
            }).then(res => res.json()),
    );

    const { data: profileData} = useSWR(
        authToken ? `${process.env.REACT_APP_BASE_API_URL}/api/profiles/${profileId}?with_contacts=True` : null,
        url =>
            fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${authToken}`,
                },
            }).then(res => res.json()),
    );

    const urlViewed = `${process.env.REACT_APP_BASE_API_URL}/api/viewed-list/`;
    const viewedData = userData && {user: userData.id, company: profileId,};

    async function sendRequest(url, data ) {
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
            await sendRequest(
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
            await sendRequest(
                urlViewed,
                viewedData
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        profileData ? (
            <>
                <div className={classes['data-block__field']}>
                    <p className={classes['data-block__field--title']}>Телефон</p>
                    {isPhoneShown ?
                    (
                    <p className={classes['data-block__field--phone']}>{profileData.phone}</p> ) : (
                    <button type="button" onClick={handlePhoneClick} disabled={!isAuthorized} className={classes['data-block__field--show--phone']}>
                            Показати телефон
                    </button>
                    )}
                </div>
                <div className={classes['data-block__field']}>
                    <p className={classes['data-block__field--title']}>Електронна пошта</p>
                    {isEmailShown ? (
                    <p className={classes['data-block__field--email']}>{profileData.email}</p> ) : (
                    <button type="button" onClick={handleEmailClick} disabled={!isAuthorized} className={classes['data-block__field--show--email']}>Показати ел. пошту</button>
                    )}
                </div>

            </>
        ) : null
    );
}

export default PhoneEmail;

PhoneEmail.propTypes = {
    isAuthorized: PropTypes.bool.isRequired,
    profileId: PropTypes.number.isRequired
  };
