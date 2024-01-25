import { Link } from 'react-router-dom';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { useState, useEffect } from 'react';
// import { useState, useMemo, useEffect } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import axios from 'axios';
import styles from './CompanyCard.module.css';
import PropTypes from 'prop-types';

const CompanyCard = ({ companyData, isAuthorized, userData, issaved }) => {
  CompanyCard.propTypes = {
    companyData: PropTypes.object,
    isAuthorized: PropTypes.any,
    userData: PropTypes.any,
    issaved: PropTypes.bool,
  };
  // const saved = useMemo(() => {
  //   return {
  //     is_saved: issaved,
  //   };
  // }, [issaved]);
  // console.log(saved);
  // const company = useMemo(() => {
  //   return {
  //     id: companyData.id,
  //     name: companyData.name,
  //     categories: companyData.categories,
  //     logo: companyData.logo_image,
  //     banner: companyData.banner_image,
  //     founded: companyData.founded,
  //     address: companyData.address,
  //     personId: companyData.person,
  //   };
  // }, [companyData]);
  const company = companyData;
  company.issaved = issaved;

  const { mutate } = useSWRConfig();
  const authToken = localStorage.getItem('Token');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const yearsOfExperiense = company.founded ? currentYear - company.founded : 0;
  const [isSaved, setIsSaved] = useState(company.is_saved);
  const [star, setStar] = useState(false);
  // const ownCompany = userData && company.personId == userData.id;
  // console.log(isSaved);
  // console.log(issaved, 'prop');
  console.log(isSaved);
  console.log(company.issaved);

  async function sendRequest(url) {
    return await axios.post(
      url,
      { user: userData?.id, company: company['id'] },
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

  const handleClick = async () => {
    try {
      await trigger({ optimisticData: () => setIsSaved(!isSaved) });
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
  // mutate(
  //   (key) => typeof key === 'string' && key.startsWith('/api/saved-list/'),
  //   {
  //     revalidate: true,
  //   }
  // );

  // const getRequest = useCallback(() => {
  // const handleClick = async () => {
  //   try {
  //     await trigger({ optimisticData: () => setIsSaved(!isSaved) });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getStar = () => {
    if (userData && company.personId == userData.id) {
      setStar(false);
      setIsSaved(false);
      // return null;
    } else {
      if (isSaved) {
        setStar(filledStar);
        setIsSaved(true);
        // return filledStar;
      } else {
        setIsSaved(false);
        setStar(outlinedStar);
        // return outlinedStar;
      }
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

  // const getStar = () => {
  // if (isAuthorized) {
  //   if (ownCompany) {
  //     setStar(false);
  //   } else {
  //     if (isSaved) {
  //       setStar(filledStar);
  //     } else {
  //       setStar(outlinedStar);
  //     }
  //   }
  // }
  // };
  // }, [savedList, userData, isSaved, trigger, isAuthorized, company.id]);

  // mutate(
  //   (key) => typeof key === 'string' && key.startsWith('/api/saved-list/'),
  //   {
  //     revalidate: true,
  //   }
  // );
  // useEffect(() => {}, [trigger]);
  const { trigger: triggerget } = useSWRMutation(
    `${process.env.REACT_APP_BASE_API_URL}/api/profiles`,
    getStar
  );
  useEffect(() => {
    if (isAuthorized) {
      try {
        triggerget();
      } catch (error) {
        console.error(error);
      }
    }
  }, [isAuthorized, triggerget]);
  // useEffect(() => {
  //   if (isAuthorized) {
  //     try {
  //       trigger();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // }, [isAuthorized, trigger]);

  // useEffect(() => {
  //   try {
  //     trigger();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }, [trigger]);

  // useEffect(() => {
  //   setIsSaved(!isSaved);
  // }, [isSaved, trigger]);

  return (
    <div className={styles['company-card']}>
      <div className={styles['company-card__block']}>
        <div className={styles['company-card__image-frame']}>
          {company.banner_image ? (
            <img
              src={company.banner_image}
              alt="Company Banner"
              className={styles['company-card__image']}
            />
          ) : (
            <img
              className={styles['company-card__empty-image']}
              src={`${process.env.REACT_APP_PUBLIC_URL}/svg/profile-view-image-empty.svg`}
              alt={company.name}
            />
          )}
        </div>
        <div className={styles['company-card__text-block']}>
          <div className={styles['company-card__text-block__header']}>
            <div className={styles['company-card__category-text']}>
              {company.categories &&
                company.categories.map((category) => category.name).join(' ')}
            </div>
            <div className={styles['company-card__name-text']}>
              <Link
                className={styles['company-card__name-text_link']}
                to={`/profile-detail/${company.id}`}
              >
                {company.name}
              </Link>
              <br />
            </div>
          </div>
          <div className={styles['company-card__address-text']}>
            {company.address}
          </div>
          <div className={styles['company-card__badges-block']}>
            <div className={styles['company-card__badges']}>
              <div className={styles['company-card__badge']}>
                <div className={styles['company-card__badge-text']}>
                  {yearsOfExperiense} років досвіду
                </div>
              </div>
            </div>
            {/* {getRequest} */}
            {star}
            {/* {isAuthorized && !ownCompany
              ? isSaved
                ? filledStar
                : outlinedStar
              : null} */}
          </div>
        </div>
      </div>
      <div className={styles['company-card__logo']}>
        <div className={styles['company-card__logo-ellipse']}>
          {company.logo_image ? (
            <img
              src={company.logo_image}
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
