import { Link } from 'react-router-dom';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import axios from 'axios';
import styles from './CompanyCard.module.css';
// import PropTypes from 'prop-types';

const CompanyCard = ({ companyData, isAuthorized }) => {
  // CompanyCard.propTypes = {
  //   companyData: PropTypes.object,
  //   isAythorized: PropTypes.object,
  // };
  // console.log(companyData['id']);

  const { mutate } = useSWRConfig();
  const authToken = localStorage.getItem('Token');
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const yearsOfExperiense = companyData.founded
    ? currentYear - companyData.founded
    : 0;
  const [usersSavedList, setUsersSavedList] = useState([]);
  const [star, setStar] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  async function sendRequest(url, { arg: data }) {
    return await axios.post(
      url,
      { company_pk: data['company_pk'] },
      {
        withCredentials: true,
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    );
  }

  async function getRequest(url) {
    const data = await axios
      .get(url, {
        withCredentials: true,
        headers: {
          Authorization: 'Token ' + authToken,
        },
      })
      .then((response) => {
        return response.data;
      });
    const NewList = [];
    for (let item of data.results) {
      NewList.push(item['id']);
    }

    setUsersSavedList(NewList);
    if (usersSavedList.includes(companyData.id)) {
      setStar(filledStar);
      setIsSaved(true);
    } else {
      setIsSaved(false);
      setStar(outlinedStar);
    }
    setSearchPerformed(true);
  }

  const { trigger } = useSWRMutation(
    `${process.env.REACT_APP_BASE_API_URL}/api/saved-list/`,
    sendRequest
  );

  const { trigger: triggerget } = useSWRMutation(
    `${process.env.REACT_APP_BASE_API_URL}/api/profiles/?is_saved=True`,
    getRequest
  );

  const handleClick = async () => {
    try {
      await trigger(
        { company_pk: companyData.id },
        { optimisticData: () => setIsSaved(!isSaved) }
      );
    } catch (error) {
      console.error(error);
    }
  };

  mutate((key) => typeof key === 'string' && key.startsWith('/api/profiles/'), {
    revalidate: true,
  });

  const filledStar = (
    <StarFilled className={styles['star']} onClick={handleClick} />
  );
  const outlinedStar = (
    <StarOutlined className={styles['star']} onClick={handleClick} />
  );

  useEffect(() => {
    if (isAuthorized.isAuth) {
      try {
        triggerget();
      } catch (error) {
        console.error(error);
      }
    }
  }, [companyData, isAuthorized, isSaved, searchPerformed]);

  return (
    <div className={styles['company-card']}>
      <div className={styles['company-card__block']}>
        <div className={styles['company-card__image-frame']}>
          <img
            className={styles['company-card__image']}
            src={`${process.env.PUBLIC_URL}/companies-logos/defaultcompanybanner.png`}
            alt={companyData.name}
          />
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
                to={`/profile/${companyData.id}`}
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
            {/* {isAuthorized ? (isSaved ? filledStar : outlinedStar) : null} */}
            {star}
            {/* <div>{}</div> */}
          </div>
        </div>
      </div>
      <div className={styles['company-card__logo']}>
        <div className={styles['company-card__logo-ellipse']}>
          <img
            className={styles['company-card__logo-image']}
            src={`${process.env.PUBLIC_URL}/companies-logos/1.png`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
