import { Link } from 'react-router-dom';
import wish_list_checklist from './img/wish_list_checklist.svg';
import wish_list_checklist_added from './img/wish_list_checklist_added.svg';
import './CompaniesCards.css';

const MainCompanies = ({ companyData, isAuthorized }) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const usersSavedList = [];

  return (
    <div className="product-card">
      <div className="product-card__block">
        <div className="product-card__image-frame">
          <img
            className="product-card__image"
            src={companyData.banner_image}
            alt={companyData.name}
          />
        </div>
        <div className="product-card__text-block">
          <div className="product-card__text-block__header">
            <div className="product-card__category-text align_items_left">
              {companyData.categories &&
                companyData.categories
                  .map((category) => category.name)
                  .join(' ')}
            </div>
            <div className="product-card__name-text align_items_left">
              <Link
                className="product-card__name-text_link"
                to={`/profile/${companyData.id}`}
              >
                {companyData.name}
              </Link>
              <br />
            </div>
          </div>
          <div className="product-card__address-text align_items_left">
            {companyData.address}
          </div>
          <div className="product-card__badges-block">
            <div className="product-card__badges">
              <div className="product-card__badge">
                <div className="product-card__badge-text">
                  {currentYear - companyData.founded} років досвіду
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
                        className="product-card__buttons"
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
                        className="product-card__buttons"
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
      <div className="product-card__logo">
        <div className="product-card__logo-ellipse">
          <img
            className="product-card__logo-image"
            alt={`${companyData.name} logo`}
          />
        </div>
      </div>
    </div>
  );
};

export default MainCompanies;
