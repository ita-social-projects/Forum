import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { PropTypes } from 'prop-types';
import useSWRMutation from 'swr/mutation';

import { useUser } from '../../../hooks';
import DefaultLogo from './DefaultLogo';
import classes from './TitleInfo.module.css';

function TitleInfo({ isAuthorized, data }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(data.is_saved);
  const profile = useMemo(() => {
    return {
      id: data.id,
      personId: data.person,
      name: data.name,
      activities: data.activities && data.activities.length
        ? data.activities.map((activity) => activity.name).join(', ')
        : null,
      region: data.region_display ? data.region_display : '',
      categories:
        data.categories &&
        data.categories.length > 4
          ? data.categories.slice(0, 4)
          : data.categories,
      isSaved: data.is_saved,
    };
  }, [data]);

  const ownProfile = user && user.id === profile.personId;

  async function sendRequest(url, { arg: data }) {
    const authToken = localStorage.getItem('Token');
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${authToken}`,
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (!res.ok && res.status === 403) {
        const error = new Error('Own company cannot be added to the saved list.');
              error.info = res.json();
              error.status = res.status;
              throw error;
      }
    })
      .catch(error => {
        console.error(error);
      });
  }

  const { trigger } = useSWRMutation(
    `${process.env.REACT_APP_BASE_API_URL}/api/saved-list/`,
    sendRequest
  );

  const handleClick = async () => {
    try {
      await trigger(
        { company_pk: profile.id },
        { optimisticData: () => {
            setIsSaved(!isSaved);
            }
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const navigateToEditProfile = () => {
    navigate('/profile/user-info');
  };

  const filledStar = (
    <StarFilled
      style={{ color: '#FFD800', fontSize: '24px' }}
      onClick={handleClick}
    />
  );
  const outlinedStar = (
    <StarOutlined
      style={{ color: '#FFD800', fontSize: '24px' }}
      onClick={handleClick}
    />
  );

  const CategoryBadges = ({ categories }) => {
    return (
      <>
        {categories
          ? categories.map((category) => (
              <Badge
                key={category.id}
                size="medium"
                count={category.name.toUpperCase()}
                style={{
                  backgroundColor: '#1F9A7C',
                  fontWeight: 600,
                  fontFamily: 'Inter',
                  fontSize: 10,
                }}
              />
            ))
          : ''}
      </>
    );
  };

  // TODO: add logo from db once it's implemented on the server side

  const logo = '';

  return (
    <div className={classes['title-block']}>
      <div className={classes['title-block__logo']}>
        {!logo ? (
          <DefaultLogo />
        ) : (
          <img className={classes['logo']}
            src=""
            alt="Company logo"
          />
        )}
      </div>
      <div className={classes['title-block__about']}>
        <div className={classes['title-block__activity']}>{profile.activities}</div>
        <div className={classes['title-block__company']}>
          <div className={classes['title-block__company_name']}>{profile.name}</div>
          <div className={classes['title-block__company_category']}>
            <CategoryBadges categories={profile.categories} />
          </div>
        </div>
        <div className={classes['title-block__company_region']}>{profile.region}</div>
      </div>
      {isAuthorized ? (
        <>
          {!ownProfile && (
            <button
              onClick={handleClick}
              type="button"
              className={`${classes['title-block__button']} ${isSaved && classes['added_to_saved__button']}`}
            >
              <span className={`${classes['title-block__button--text']} ${isSaved && classes['added_to_saved__button--text']}`}>
                {!isSaved ? 'Додати в збережені' : 'Додано в збережені'}
              </span>
              {isAuthorized ? (isSaved ? filledStar : outlinedStar) : null}
            </button>
          )}
          {ownProfile && (
            <button
              type="button"
              className={`${classes['title-block__button']}`}
              onClick={navigateToEditProfile}
            >
              <span className={`${classes['title-block__button--text']}`}>Редагувати профіль</span>
            </button>
          )}
        </>
      ) : null}
    </div>
  );
}

export default TitleInfo;

TitleInfo.propTypes = {
  isAuthorized: PropTypes.bool,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    person: PropTypes.number,
    address: PropTypes.string,
    region_display: PropTypes.string,
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    activities: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
      })
    ),
    is_saved: PropTypes.bool.isRequired,
  }).isRequired,
};
