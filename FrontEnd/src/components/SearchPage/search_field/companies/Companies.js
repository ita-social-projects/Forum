import { Link } from 'react-router-dom';
import wish_list_checklist from './img/wish_list_checklist.svg';
import wish_list_checklist_added from './img/wish_list_checklist_added.svg';
import styles from './CompaniesCards.module.css';

const MainCompanies = ({ companyData, isAuthorized }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const usersSavedList = [];
  const yearsOfExperiense = companyData.founded
    ? currentYear - companyData.founded
    : 0;

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

            {/* if user is authorized - show add to favorite button*/}
            {isAuthorized === true && (
              <>
                {/* Add checking if company is in user list */}
                {usersSavedList.includes(companyData.id) ? (
                  <>
                    <div>
                      {/* if company added - del from saved list */}
                      <button
                        className={styles['product-card__buttons']}
                        // onClick={() => delFromSavedList(companyData.profile_id)}
                      >
                        <img src={wish_list_checklist_added} alt="" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      {/* if compony not added - add to saved list */}
                      <button
                        className={styles['product-card__buttons']}
                        // onClick={() => addToSavedList(companyData.profile_id)}
                      >
                        <img src={wish_list_checklist} alt="Add to wish list" />
                      </button>
                    </div>
                  </>
                )}
              </>
            )}
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
          {/* <img
            className={styles['product-card__logo-image']}
            alt={`${companyData.name} logo`}
          /> */}
        </div>
      </div>
    </div>
  );
};

export default MainCompanies;
