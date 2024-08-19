import { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Typography } from 'antd';
import { PropTypes } from 'prop-types';

import { useAuth } from '../../hooks';
import css from './ProfileCard.module.css';
import axios from 'axios';
import CategoryBadges from '../MiniComponents/CategoryBadges';
import StarForLike from '../MiniComponents/StarForLike';
import BellForUpdates from '../MiniComponents/BellForUpdates';

const { Paragraph } = Typography;

export default function ProfileCard({ isAuthorized, data }) {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(data.is_saved);
  const [savedIsUpdated, setIsUpdated] = useState(data.saved_is_updated);

  useEffect(() => {
    setIsUpdated(data.saved_is_updated);
  }, [data.saved_is_updated]);

  const profile = useMemo(() => {
    return {
      id: data.id,
      personId: data.person,
      name: data.name,
      activities: !data.activities.length
        ? null
        : data.activities.map((activity) => activity.name).join(', '),
      region: data.regions_ukr_display ? data.regions_ukr_display : '',
      categories: data.categories,
      isSaved: data.is_saved,
      savedIsUpdated: data.saved_is_updated,
      commonInfo: data.common_info,
      logo: data.logo,
    };
  }, [data]);

  const ownProfile = user && user.id === profile.personId;

  const handleSave = async () => {
    setIsSaved(true);
    try {
      await axios.post(`${process.env.REACT_APP_BASE_API_URL}/api/saved-list/`,{ company_pk: profile.id });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteSaved = async () => {
    setIsSaved(false);
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_API_URL}/api/saved-list/${profile.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileViewed = async () => {
    if (profile.savedIsUpdated) {
      profile.savedIsUpdated = false;
      try {
        await axios.patch(`${process.env.REACT_APP_BASE_API_URL}/api/saved-list/${profile.id}/`, { company_pk: profile.id, is_updated: profile.savedIsUpdated });
      } catch (error) {
      console.error(error);
      }
    }
  };

  return (
    <div className={css['company-card']}>
      <Link
        className={css['company-card__link']}
        to={`/profile-detail/${profile.id}`}
        onClick={handleProfileViewed}
      >
        <div className={css['logo-box']}>
          <img
            className={css.logo}
            src={
              profile.logo?.path ||
              `${process.env.REACT_APP_PUBLIC_URL}/companies-logos/default_logo.png`
            }
            alt="Company logo"
          />
        </div>
        <div className={css.content}>
          <div className={css['content-header']}>
            <div className={css['content-header__activity']}>
              <p className={css['content-header__activity--text']}>
                {profile.activities}
              </p>
            </div>
            <div className={css['content-header__name']}>{profile.name}</div>
            <div className={css['content-header__address']}>
              {profile.region}
            </div>
          </div>
          <div className={css['content__common-info']}>
            <Paragraph ellipsis={{ rows: 3, expandable: false }}>
              {profile.commonInfo}
            </Paragraph>
          </div>
          <div className={css['content__categories']}>
            <CategoryBadges categories={profile.categories} />
          </div>
        </div>
      </Link>
      <div className={css['icon-container']}>
        <BellForUpdates
          className={savedIsUpdated ? '' : 'hidden'}
          savedIsUpdated={savedIsUpdated}
        ></BellForUpdates>
        <StarForLike
          isSaved={isSaved}
          isAuthorized={isAuthorized}
          ownProfile={ownProfile}
          handleClick={isSaved ? handleDeleteSaved : handleSave}
        ></StarForLike>
      </div>
    </div>
  );
}

ProfileCard.propTypes = {
  isAuthorized: PropTypes.bool,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    person: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    regions_ukr_display: PropTypes.string,
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
    common_info: PropTypes.string,
    is_saved: PropTypes.bool.isRequired,
    saved_is_updated: PropTypes.bool.isRequired,
    logo: PropTypes.shape({
      path: PropTypes.string,
      uuid: PropTypes.string,
    }),
  }).isRequired,
};
