import { Link } from 'react-router-dom';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import styles from './CompanyCard.module.css';
import { useUser } from '../../hooks';
import PropTypes from 'prop-types';
import { Tooltip, Badge } from 'antd';

export default function CompanyCard({
  profile,
  isAuthorized,
  changeCompanies,
}) {
  const lengthOfRegion = 35;
  const lengthOfCategoryActivityArray = 3;
  const { mutate } = useSWRConfig();

  const { user } = useUser();

  const ownProfile = user && user.id === profile.person;
  const activitiesString =
    profile.activities &&
    profile.activities.map((element) => element.name).join(', ');

  const activitiesSliceString =
    profile.activities &&
    profile.activities
      .slice(0, lengthOfCategoryActivityArray)
      .map((activity) => activity.name)
      .join(' ');

  async function sendRequest(url, { arg: data }) {
    const authToken = localStorage.getItem('Token');
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${authToken}`,
      },
      body: JSON.stringify(data),
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
        { optimisticData: () => changeCompanies(profile.id, !profile.is_saved) }
      );
      mutate(
        (key) => typeof key === 'string' && key.startsWith('/api/saved-list/'),
        {
          revalidate: true,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const filledStar = (
    <StarFilled
      className={styles['star']}
      onClick={handleClick}
      data-testid="star"
    />
  );
  const outlinedStar = (
    <StarOutlined
      className={styles['star']}
      onClick={handleClick}
      data-testid="emptystar"
    />
  );
  const getStar = () => {
    return isAuthorized && !ownProfile
      ? profile.is_saved
        ? filledStar
        : outlinedStar
      : null;
  };

  const CategoryBadges = ({ categories }) => {
    const style = {
      backgroundColor: '#1F9A7C',
      fontWeight: 600,
      fontFamily: 'Inter',
      fontSize: 10,
      margin: 5,
    };
    return (
      <div>
        {categories
          ? categories.map((category) => (
              <Badge
                title=""
                key={category.id}
                size="medium"
                count={category.name.toUpperCase()}
                style={style}
              />
            ))
          : null}
      </div>
    );
  };

  return (
    <div className={styles['company-card']}>
      <div className={styles['company-card__block']}>
        <div className={styles['company-card__image-frame']}>
          {profile.banner ? (
            <img
              src={profile.banner}
              alt="Company Banner"
              className={styles['company-card__image']}
            />
          ) : (
            <img
              className={styles['company-card__empty-image']}
              src={`${process.env.REACT_APP_PUBLIC_URL}/svg/profile-view-image-empty.svg`}
              alt={profile.name}
            />
          )}
        </div>
        <div className={styles['company-card__text-block']}>
          <Tooltip
            title={activitiesString}
            placement="bottom"
            pointAtCenter={true}
          >
            <div className={styles['company-card__category-text']}>
              {activitiesSliceString}
            </div>
          </Tooltip>
          <div className={styles['company-card__text-block__header']}>
            <div className={styles['company-card__name-text']}>
              <Link
                className={styles['company-card__name-text_link']}
                to={`/profile-detail/${profile.id}`}
              >
                {profile.name}
              </Link>
            </div>
          </div>
          <Tooltip
            title={profile.region}
            placement="bottom"
            pointAtCenter={true}
          >
            <div className={styles['company-card__region-text']}>
              {profile.region
                ? profile.region.length < lengthOfRegion
                  ? `${profile.region}`
                  : `${profile.region.substring(0, 35)}...`
                : ''}
            </div>
          </Tooltip>
          <div className={styles['company-card__footer_content']}>
            <Tooltip
              title={
                profile.categories &&
                profile.categories.map((element) => element.name).join(', ')
              }
              placement="bottom"
              pointAtCenter={true}
            >
              <div className={styles['company-card__badges_block']}>
                <CategoryBadges categories={profile.categories.slice(0, 3)} />
              </div>
            </Tooltip>
            {getStar()}
          </div>
        </div>
      </div>
      <div className={styles['company-card__logo']}>
        <div className={styles['company-card__logo-ellipse']}>
          {profile.logo ? (
            <img
              src={profile.logo}
              alt="Logo"
              className={styles['company-card__logo-image']}
            />
          ) : (
            <img
              className={styles['company-card__logo-image']}
              src={`${process.env.REACT_APP_PUBLIC_URL}/companies-logos/default_logo.png`}
              alt=""
            />
          )}
        </div>
      </div>
    </div>
  );
}

CompanyCard.propTypes = {
  data: PropTypes.object,
  isAuthorized: PropTypes.bool,
  changeCompanies: PropTypes.func,
};
