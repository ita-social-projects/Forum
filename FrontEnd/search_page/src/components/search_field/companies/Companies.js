import './Companies.css';
import './CompaniesCards.css';
import like_logo from './like_logo.svg';
import wish_list_checklist from './wish_list_checklist.svg'

const MainCompanies = ({ companyData }) => {
    
    return (
            <div className="product-card__block">
                <div className="product-card__text-block">
                    <div className="product-card__text-block__header">
                        <div><a href='#' className="product-card__name-text">{companyData.comp_name}</a></div>
                    </div>
                    <div className="product-card__address-text">{companyData.comp_common_info}</div>
                    <div className="product-card__badges-block">{companyData.comp_product_info}</div>
                    <div>
                        <button className='product-card__buttons'><img src={like_logo} width="25" height="25" alt=""/></button>
                        <button className='product-card__buttons'><img src={wish_list_checklist} width="25" height="25" alt=""/></button>
                    </div>
                </div>
            </div>
    );

};

export {MainCompanies};