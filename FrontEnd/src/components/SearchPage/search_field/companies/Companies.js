import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import wish_list_checklist from './wish_list_checklist.svg';
import wish_list_checklist_added from './wish_list_checklist_added.svg'
import './CompaniesCards.css';


const MainCompanies = ({ companyData, isAuthorized }) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();

    // those variables we would use for axios to get data from beckend
    const usersSavedList = []

    // get saved list code here
    // add company to saved list code here
    addToSavedList((profile_id) = {

    })
    // del company from saved list code here
    delFromSavedList((profile_id) = {

    })
    
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
                            <Link className='product-card__name-text_link' to={`/profile/${companyData.profile_id}`}>{companyData.comp_name}</Link>
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

                        {/* if user is authorized - show add to favorite button*/}
                        {isAuthorized === true && (
                            <>
                            {/* Add checking if company is in user list */}
                                { usersSavedList.includes(companyData.profile_id) ? (  
                                    <>
                                        <div>
                                            {/* if company added - del from saved list */}
                                            <button className='product-card__buttons'/* onClick={() => delFromSavedList(companyData.profile_id)}*/>
                                                <img src={wish_list_checklist_added} alt=""/>
                                            </button>
                                        </div>
                                </>
                                ) : (
                                    <>
                                        <div>
                                            {/* if compony not added - add to saved list */}
                                            <button className='product-card__buttons'/* onClick={() => addToSavedList(companyData.profile_id)}*/>
                                                <img src={wish_list_checklist} alt=""/>
                                            </button>
                                        </div>
                                    </>
                                ) }
                            </>
                        ) }
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
