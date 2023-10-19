import { Link } from 'react-router-dom';
import { StarOutlined, StarFilled } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
// import useSWR from 'swr';
import axios from 'axios';
import styles from './CompanyCard.module.css';

const CompanyCard = ({ companyData, isAuthorized }) => {
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

  async function sendRequest(url, { arg: data }) {
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
    if (isAuthorized)
      axios
        .get(
          `${process.env.REACT_APP_BASE_API_URL}/api/profiles/?is_saved=True`,
          {
            withCredentials: true,
            headers: {
              Authorization: 'Token ' + authToken,
            },
          }
        )
        .then((response) => {
          const NewList = [];
          for (let item of response.data.results) {
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
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
        });
  }, [usersSavedList]);

  return (
    <div className={styles['product-card']}>
      <div className={styles['product-card__block']}>
        <div className={styles['product-card__image-frame']}>
          <img
            className={styles['product-card__image']}
            // src={companyData.banner_image}
            src={`${process.env.PUBLIC_URL}/companies-logos/defaultcompanybanner.png`}
            alt={companyData.name}
          />
        </div>
        <div className={styles['product-card__text-block']}>
          <div className={styles['product-card__text-block__header']}>
            <div className={styles['product-card__category-text']}>
              {companyData.categories &&
                companyData.categories
                  .map((category) => category.name)
                  .join(' ')}
            </div>
            <div className={styles['product-card__name-text']}>
              <Link
                className={styles['product-card__name-text_link']}
                to={`/profile/${companyData.id}`}
              >
                {companyData.name}
              </Link>
              <br />
            </div>
          </div>
          <div className={styles['product-card__address-text']}>
            {companyData.address}
          </div>
          <div className={styles['product-card__badges-block']}>
            <div className={styles['product-card__badges']}>
              <div className={styles['product-card__badge']}>
                <div className={styles['product-card__badge-text']}>
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
      <div className={styles['product-card__logo']}>
        <div className={styles['product-card__logo-ellipse']}>
          <img
            className={styles['product-card__logo-image']}
            src={`${process.env.PUBLIC_URL}/companies-logos/1.png`}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyCard;
