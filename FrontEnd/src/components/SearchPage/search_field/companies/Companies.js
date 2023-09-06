import { Link } from 'react-router-dom';
import wish_list_checklist from './wish_list_checklist.svg';
import './CompaniesCards.css';

const MainCompanies = ({ companyData }) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    return (
        <div className="product-card">
            <div className="product-card__block">
                <div className="product-card__image-frame">
                    <img className="product-card__image" src={companyData.comp_banner_image} alt={companyData.comp_name} />
                </div>
                <div className="product-card__text-block">
                    <div className="product-card__text-block__header">
                        <div className="product-card__category-text align_items_left">{companyData.comp_category.map(category => category.name).join(' ')}</div>
                        <div className="product-card__name-text align_items_left">
                            <Link className='product-card__name-text_link' to={`/company/${companyData.profile_id}`}>{companyData.comp_name}</Link>
                            <br />
                        </div>
                    </div>
                    <div className="product-card__address-text align_items_left">{companyData.comp_address}</div>
                    <div className="product-card__badges-block">
                        <div className="product-card__badges">
                            <div className="product-card__badge">
                                <div className="product-card__badge-text">{currentYear - companyData.comp_year_of_foundation} років досвіду</div>
                            </div>
                        </div>
                        <div>
                            <button className='product-card__buttons'><img src={wish_list_checklist} alt=""/></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-card__logo">
                <div className="product-card__logo-ellipse">
                <img className="product-card__logo-image"  alt=""/>
                </div>
            </div>
        </div>
    );
};

export default MainCompanies;
