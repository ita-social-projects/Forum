import axios from 'axios';
import { useState } from 'react';
import useSWR from 'swr';
import { useAuth } from '../../../hooks';
import { PropTypes } from 'prop-types';
import classes from './PhoneEmail.module.css';
import { CheckOutlined, CopyOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { Tooltip } from 'antd';

const LENGTH_EMAIL = 14;

function PhoneEmail({ isAuthorized, profileId, personId }) {
  const [isContactsShown, setContactsShown] = useState(false);
  const [isPhoneCopied, setIsPhoneCopied] = useState(false);
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const { user } = useAuth();

  const copyContent = (key) => {
    try {
      navigator.clipboard.writeText(profileData[key]);
      if (key === 'phone') {
        setIsPhoneCopied(true);
        setTimeout(() => setIsPhoneCopied(false), 4000);
      } else {
        setIsEmailCopied(true);
        setTimeout(() => setIsEmailCopied(false), 4000);
      }
    } catch (error) {
      toast.error('Інформацію не скопійовано, спробуйте ще раз.');
    }
  };

  const renderIcons = (state) => {
    return state ? (
      <CheckOutlined style={{ color: '#46a310' }} />
    ) : (
      <CopyOutlined style={{ cursor: 'pointer' }} />
    );
  };

  const { data: profileData } = useSWR(
    [`${process.env.REACT_APP_BASE_API_URL}/api/profiles/${profileId}?with_contacts=True`, isAuthorized],
    (url) =>
      axios
        .get(url)
        .then((res) => res.data)
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
      await addToViewed(urlViewed);
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
              <p className={classes['contact-container']}>
                <span>{profileData.phone}</span>
               {
                profileData.phone ? <span onClick={() => copyContent('phone')}>
                  {renderIcons(isPhoneCopied)}
                </span>
                : null
               }
              </p>
              <p className={classes['contact-container']}>
               {profileData.email.length > LENGTH_EMAIL ? (
                  <Tooltip title={profileData.email} placement="bottom">
                    <span>{`${profileData.email.slice(0, LENGTH_EMAIL)}...`}</span>
                  </Tooltip>
                ) : (
                  <span>{profileData.email}</span>
                )}
               {
                profileData.email ? <span onClick={() => copyContent('email')}>
                  {renderIcons(isEmailCopied)}
                </span>
                : null
               }
              </p>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleContactsClick}
              className={classes['data-block__field--show--contacts']}
            >
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
