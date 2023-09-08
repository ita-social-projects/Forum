import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import wish_list_checklist from './wish_list_checklist.svg';
import wish_list_checklist_added from './wish_list_checklist_added.svg'
import './CompaniesCards.css';


const MainCompanies = ({ companyData, isAuthorized }) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const [usersSavedList, setUsersSavedList] = useState([]);

    const authToken = 'c1080bd82727ae99c40fba60c917e7bb85e1f069'                        // change login of getting authorization token

    const serverAddress = process.env.REACT_APP_SERVER_ADDRESS;
    const getSavedListUrl = process.env.REACT_APP_SAVED_LIST;

    // get saved list

   
    useEffect(() => {
        if (isAuthorized === true) {
            // Make an AJAX request to Django API to get saved list
            axios.get(`${serverAddress}/${getSavedListUrl}`, {
                token: 'c1080bd82727ae99c40fba60c917e7bb85e1f069'
                // headers: {
                //     Authorization: authToken
                // }
            })
            .then(response => {
                // renew list of saved companies
                setUsersSavedList(response.data.map(item => item.id));
            })
            .catch(error => {
                console.error('Error fetching saved list:', error);
            });
        }
    }, []);

    // add company to saved list

    const addToSavedList = (profile_id) => {
        
        axios.post(`${serverAddress}/${getSavedListUrl}`, {profile_id}, {
            headers: {
                Authorization: authToken                                                                // token here
            }
        })
        .then(response => {

            // add profile_id to list
            if (!usersSavedList.includes(profile_id)) {
                usersSavedList.push(profile_id);
            }
        })
        .catch(error => {
            console.error('Error while company adding:', error);
        });
    }

    // del from send list

    const delFromSavedList = (profile_id) => {
        
        // Add authorization token HERE
        const authToken = ''
        axios.post(`${serverAddress}/${getSavedListUrl}/${profile_id}/`, {}, {
            headers: {
                Authorization: authToken                                                                   // token here
            }
        })
        .then(response => {

            // delete profile_id from list
            usersSavedList = usersSavedList.filter(item => item !== profile_id);
        })
        .catch(error => {
            console.error('Error while company deleting:', error);
        });
    }
    
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
                                            <button className='product-card__buttons' onClick={() => delFromSavedList(companyData.profile_id)}>
                                                <img src={wish_list_checklist_added} alt=""/>
                                            </button>
                                        </div>
                                </>
                                ) : (
                                    <>
                                        <div>
                                            {/* if compony not added - add to saved list */}
                                            <button className='product-card__buttons' onClick={() => addToSavedList(companyData.profile_id)}>
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
