import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { PropTypes } from 'prop-types';
import classes from './PhoneEmail.module.css';

function PhoneEmail ({ profileId }) {
    const [isPhoneShown, setPhoneShown] = useState(false);
    const [isEmailShown, setEmailShown] = useState(false);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const authToken = localStorage.getItem('Token');
    const { data: userData, error: userError } = useSWR(
        authToken ? `${process.env.REACT_APP_BASE_API_URL}/api/auth/users/me/` : null,
        url =>
            fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${authToken}`,
                },
            }).then(res => res.json()),
    );

    const { data: profileData, error: profileError } = useSWR(
        authToken ? `${process.env.REACT_APP_BASE_API_URL}/api/profiles/${profileId}?with_contacts=True` : null,
        url =>
            fetch(url, {
                method: 'GET',
                headers: {
                    'Authorization': `Token ${authToken}`,
                },
            }).then(res => res.json()),
    );

    useEffect(() => {
        if (userData) {
            setUser(userData);
        }
        if (userError) {
            console.error(userError);
          }
        if (profileData) {
            setProfile(profileData);
        }
        if (profileError) {
            console.error(profileError);
          }
    }, [userData, profileData, userError, profileError]);

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
                `${process.env.REACT_APP_BASE_API_URL}/api/viewed-list/`,
                {
                user: user.id,
                company: profileId,
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    const handleEmailClick = async () => {
        setEmailShown(true);
        try {
            await sendRequest(
                `${process.env.REACT_APP_BASE_API_URL}/api/viewed-list/`,
                {
                user: user.id,
                company: profileId,
                }
            );
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className={classes['data-block__field']}>
                <p className={classes['data-block__field--title']}>Телефон</p>
                {isPhoneShown ?
                (
                <p className={classes['data-block__field--phone']}>{profile.phone}</p> ) : (
                <button type="button" onClick={handlePhoneClick} className={classes['data-block__field--show--phone']}>
                        Показати телефон
                </button>
                )}
            </div>
            <div className={classes['data-block__field']}>
                <p className={classes['data-block__field--title']}>Електронна пошта</p>
                {isEmailShown ? (
                <p className={classes['data-block__field--email']}>{profile.email}</p> ) : (
                <button type="button" onClick={handleEmailClick} className={classes['data-block__field--show--email']}>Показати ел. пошту</button>
                )}
            </div>
        </>
    );
}

export default PhoneEmail;

PhoneEmail.propTypes = {
    profileId: PropTypes.number.isRequired
  };
