import axios from 'axios';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'antd';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import useSWRMutation from 'swr/mutation';

import { useAuth } from '../../../hooks';
import DefaultLogo from './DefaultLogo';
import classes from './TitleInfo.module.css';

function TitleInfo({ isAuthorized, data }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(data.is_saved);
  const profile = useMemo(() => {
    return {
      id: data.id,
      personId: data.person,
      name: data.name,
      activities:
        data.activities && data.activities.length
          ? data.activities.map((activity) => activity.name).join(', ')
          : null,
      regions: data.regions_ukr_display ? data.regions_ukr_display : '',
      categories: data.categories ? data.categories : null,
      isSaved: data.is_saved,
      logo: data.logo_image,
    };
  }, [data]);

  const ownProfile = user && user.id === profile.personId;

  async function sendRequest(url, { arg: data }) {
    return axios.post(url, data).catch((error) => {
      if (error.response && error.response.status === 403) {
        console.error('Own company cannot be added to the saved list.');
      }
      console.error(error.response ? error.response.data : error.message);
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
        {
          optimisticData: () => {
            setIsSaved(!isSaved);
          },
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

  const getStarVisibility = () => {
    if (isAuthorized) {
      return isSaved ? filledStar : outlinedStar;
    }
  };

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

  return (
    <div className={classes['title-block']}>
      <div className={classes['title-block__logo']}>
        {!profile.logo ? (
          <DefaultLogo />
        ) : (
          <img
            className={classes['logo']}
            src={profile.logo}
            alt="Company logo"
          />
        )}
      </div>
      <div className={classes['title-block__about']}>
        <div className={classes['title-block__activity']}>
          {profile.activities}
        </div>
        <div className={classes['title-block__company']}>
          <div className={classes['title-block__company_name']}>
            {profile.name}
          </div>
          <div className={classes['title-block__company_category']}>
            <CategoryBadges categories={profile.categories} />
          </div>
        </div>
        <div className={classes['title-block__company_region']}>
          {profile.regions}
        </div>
      </div>
      {isAuthorized ? (
        <>
          {!ownProfile && (
            <button
              onClick={handleClick}
              type="button"
              className={classNames(classes['title-block__button'], {
                [classes['added_to_saved__button']]: isSaved,
              })}
            >
              <span
                className={classNames(classes['title-block__button--text'], {
                  [classes['added_to_saved__button--text']]: isSaved,
                })}
              >
                {!isSaved ? 'Додати в збережені' : 'Додано в збережені'}
              </span>
              {getStarVisibility()}
            </button>
          )}
          {ownProfile && (
            <a
              role="link"
              className={`${classes['title-block__button']} ${classes['title-block__link']}`}
              onClick={navigateToEditProfile}
            >
              <span className={`${classes['title-block__button--text']}`}>
                Редагувати профіль
              </span>
            </a>
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
    logo_image: PropTypes.string,
  }).isRequired,
};
