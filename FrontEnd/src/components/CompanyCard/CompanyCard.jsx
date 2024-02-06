import { Link } from 'react-router-dom';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { useState, useMemo } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import styles from './CompanyCard.module.css';
import { useUser } from '../../hooks';
import PropTypes from 'prop-types';
import { Tooltip, Badge } from 'antd';

export default function CompanyCard({ data, isAuthorized }) {
  CompanyCard.propTypes = {
    data: PropTypes.object,
    isAuthorized: PropTypes.bool,
  };
  const [isSaved, setIsSaved] = useState(data && data.is_saved);
  const { mutate } = useSWRConfig();
  const profile = useMemo(() => {
    return {
      id: data?.id,
      personId: data?.person,
      name: data?.name,
      region: data?.region,
      categories: data?.categories,
      activities: data?.activities,
      logo: data?.logo_image,
      banner: data?.banner_image,
      founded: data?.founded,
      isSaved: data?.is_saved,
    };
  }, [data]);

  const { user } = useUser();
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
    }).then();
  }

  const { trigger } = useSWRMutation(
    `${process.env.REACT_APP_BASE_API_URL}/api/saved-list/`,
    sendRequest
  );

  const handleClick = async () => {
    try {
      await trigger(
        { company_pk: profile.id },
        { optimisticData: () => setIsSaved(!isSaved) }
      );
      mutate(
        (key) => typeof key === 'string' && key.startsWith('/api/profiles/'),
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

  const CategoryBadges = ({ categories }) => {
    return (
      <div>
        {categories
          ? categories.map((category) => (
              <Badge
                title=""
                key={category.id}
                size="medium"
                count={category.name.toUpperCase()}
                style={{
                  backgroundColor: '#1F9A7C',
                  fontWeight: 600,
                  fontFamily: 'Inter',
                  fontSize: 10,
                  margin: 5,
                }}
              />
            ))
          : ''}
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
            title={
              profile.activities &&
              profile.activities.map((element) => element.name).join(', ')
            }
            placement="bottom"
            pointAtCenter={true}
          >
            <div className={styles['company-card__category-text']}>
              {profile.activities &&
                profile.activities
                  .slice(0, 3)
                  .map((activity) => activity.name)
                  .join(' ')}
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
              <br />
            </div>
          </div>
          <Tooltip
            title={profile.region}
            placement="bottom"
            pointAtCenter={true}
          >
            <div className={styles['company-card__region-text']}>
              {profile.region
                ? profile.region.length < 35
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

            {isAuthorized && !ownProfile
              ? isSaved
                ? filledStar
                : outlinedStar
              : null}
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
