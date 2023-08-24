// import 'src/components/landing-page/companies/Companies.css'
import './CompaniesCards.css';
import like_logo from './like_logo.svg';
import wish_list_checklist from './wish_list_checklist.svg'

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
                        <div className="product-card__name-text align_items_left">{companyData.comp_name}<br /></div>
                    </div>
                    <div className="product-card__address-text align_items_left">{companyData.comp_address}</div>
                    <div className="product-card__badges-block">
                        <div className="product-card__badges">
                            <div className="product-card__badge">
                                <div className="product-card__badge-text">{currentYear - companyData.comp_year_of_foundation} років досвіду</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className='product-card__buttons'><img src={like_logo} width="25" height="25" alt=""/></button>
                        <button className='product-card__buttons'><img src={wish_list_checklist} width="25" height="25" alt=""/></button>
                    </div>
                </div>
            </div>
            <div className="product-card__logo">
                <div className="product-card__logo-ellipse">
                <img className="product-card__logo-image"  alt=""/>
                </div>
            </div>
        </div>




        // <div className="product-card">
        //     <div className="product-card__block">
                
        //         <div className='product-card__image-frame'>
        //             <image className='product-card__image' src={companyData.comp_banner_image} alt={companyData.comp_name}/>
        //         </div>
        //         <div className="product-card__text-block">
        //             <div className="product-card__text-block__header">
        //                 <div className='product-card__category-text'>
        //                     {}
        //                 </div>




        //                 <div><a href='#' className="product-card__name-text">{companyData.comp_name}</a></div>
        //                 <div className="product-card__address-text">{companyData.comp_common_info}</div>
        //                 <div className="product-card__badges-block">{companyData.comp_product_info}</div>
        //                 <div>
        //                     <button className='product-card__buttons'><img src={like_logo} width="25" height="25" alt=""/></button>
        //                     <button className='product-card__buttons'><img src={wish_list_checklist} width="25" height="25" alt=""/></button>
        //                 </div>
        //             </div>
        //             <div className='product-card__addtess-text'>
        //                 {companyData.comp_address}
        //             </div>
        //             <div className='product-card__budges-block'>

        //             </div>
        //         </div>
        //     </div>
        //     <div className='product-card__logo'>

        //     </div>
        // </div>
    );

};

export {MainCompanies};