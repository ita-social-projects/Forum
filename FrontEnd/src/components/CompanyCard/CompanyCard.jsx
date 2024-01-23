import { Link } from 'react-router-dom';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { useState, useEffect, useCallback } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import axios from 'axios';
import styles from './CompanyCard.module.css';
import PropTypes from 'prop-types';

const CompanyCard = ({ companyData, isAuthorized, userData, savedList }) => {
  CompanyCard.propTypes = {
    companyData: PropTypes.object,
    isAuthorized: PropTypes.any,
    userData: PropTypes.any,
    savedList: PropTypes.array,
  };

  const { mutate } = useSWRConfig();
  const authToken = localStorage.getItem('Token');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const yearsOfExperiense = companyData.founded
    ? currentYear - companyData.founded
    : 0;
  const [star, setStar] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  async function sendRequest(url) {
    return await axios.post(
      url,
      { user: userData.id, company: companyData['id'] },
      {
        withCredentials: true,
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    );
  }

  const { trigger } = useSWRMutation(
    `${process.env.REACT_APP_BASE_API_URL}/api/saved-list/`,
    sendRequest
  );

  const getRequest = useCallback(() => {
    const handleClick = async () => {
      try {
        await trigger({ optimisticData: () => setIsSaved(!isSaved) });
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
    if (isAuthorized) {
      if (companyData.id == userData.id) {
        setStar(false);
        setIsSaved(false);
      } else {
        if (savedList.includes(companyData.id)) {
          setStar(filledStar);
          setIsSaved(true);
        } else {
          setIsSaved(false);
          setStar(outlinedStar);
        }
      }
    }
  }, [companyData, savedList, userData, isSaved, trigger, isAuthorized]);

  mutate(
    (key) => typeof key === 'string' && key.startsWith('/api/saved-list/'),
    {
      revalidate: true,
    }
  );

  useEffect(() => {
    if (isAuthorized) {
      try {
        getRequest();
      } catch (error) {
        console.error(error);
      }
    }
  }, [isAuthorized, getRequest]);

  return (
    <div className={styles['company-card']}>
      <div className={styles['company-card__block']}>
        <div className={styles['company-card__image-frame']}>
          {companyData.banner_image ? (
            <img
              src={companyData.banner_image}
              alt="Company Banner"
              className={styles['company-card__image']}
            />
          ) : (
            <img
              className={styles['company-card__empty-image']}
              src={`${process.env.REACT_APP_PUBLIC_URL}/svg/profile-view-image-empty.svg`}
              alt={companyData.name}
            />
          )}
        </div>
        <div className={styles['company-card__text-block']}>
          <div className={styles['company-card__text-block__header']}>
            <div className={styles['company-card__category-text']}>
              {companyData.categories &&
                companyData.categories
                  .map((category) => category.name)
                  .join(' ')}
            </div>
            <div className={styles['company-card__name-text']}>
              <Link
                className={styles['company-card__name-text_link']}
                to={`/profile-detail/${companyData.id}`}
              >
                {companyData.name}
              </Link>
              <br />
            </div>
          </div>
          <div className={styles['company-card__address-text']}>
            {companyData.address}
          </div>
          <div className={styles['company-card__badges-block']}>
            <div className={styles['company-card__badges']}>
              <div className={styles['company-card__badge']}>
                <div className={styles['company-card__badge-text']}>
                  {yearsOfExperiense} років досвіду
                </div>
              </div>
            </div>
            {star}
          </div>
        </div>
      </div>
      <div className={styles['company-card__logo']}>
        <div className={styles['company-card__logo-ellipse']}>
          {companyData.logo_image ? (
            <img
              src={companyData.logo_image}
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
};

export default CompanyCard;
