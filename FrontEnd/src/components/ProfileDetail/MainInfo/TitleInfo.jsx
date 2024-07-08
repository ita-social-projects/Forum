import axios from 'axios';
import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';
import { useAuth } from '../../../hooks';
import DefaultLogo from './DefaultLogo';
import classes from './TitleInfo.module.css';
import CategoryBadges from '../../MiniComponents/CategoryBadges';
import StarForLike from '../../MiniComponents/StarForLike';

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

  const navigateToEditProfile = () => {
    navigate('/profile/user-info');
  };

  return (
    <div className={classes['title-block']}>
      <div className={classes['title-block__logo']}>
        {!profile.logo?.path ? (
          <DefaultLogo />
        ) : (
          <img
            className={classes['logo']}
            src={profile.logo?.path}
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
              onClick={isSaved ? handleDeleteSaved : handleSave}
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
              <StarForLike
                isSaved={isSaved}
                isAuthorized={isAuthorized}
                ownProfile={ownProfile}
              ></StarForLike>
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
    is_saved: PropTypes.bool.isRequired,
    logo: PropTypes.shape({
      path: PropTypes.string,
      uuid: PropTypes.string,
    }),
  }).isRequired,
};
