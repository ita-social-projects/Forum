import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchResults from './search_field/SearchResults';
import frame42 from './img/frame42.png';
import './search_page.css';

export function Search () {
    
    const [searchResults, setSearchResults] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [error, setError] = useState(null);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search_field');
    const servedAddress = process.env.REACT_APP_SERVER_ADDRESS;
    const searchUrl = process.env.REACT_APP_SEARCH_API_URL;

    useEffect(() => {
        if (searchTerm) {
            // Make an AJAX request to Django API to get search results
            axios.get(`${servedAddress}/${searchUrl}/?search_field=${searchTerm}`)
                .then(response => {
                    setSearchResults(response.data);
                    setSearchPerformed(true);
                    setError(null); // Clear error on successful response
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                    setError(error.response ? error.response.data : 'An error occurred');
                });
        }
    }, [searchTerm, servedAddress, searchUrl]);

    return (
        <div className='main_block'>
            <img className='frame-img-right' src={frame42} alt="frame" />
            <div className='new-companies-search_count'>
                {searchResults && <h3 className='search_results_text'>РЕЗУЛЬТАТІВ ЗА ПОШУКОМ <span className='search_field_entered_value'>{searchTerm}</span> : {searchResults.length > 0 ? searchResults.length : 0}</h3>}
                <br/>
            </div>
            <div className='new-companies-main'>
                {!error && searchResults.length > 0 ? (
                    <>
                        <SearchResults results={searchResults} searchPerformed={searchPerformed} searchTerm={searchTerm} />
                        <br/>
                    </>
                ) : (
                    <p className='search_result_error'>Пошук не дав результатів: компанії з іменем <span className='.search_result_error search_result_error_search_value'>{searchTerm}</span> не було виявлено на даний момент</p>
                )}
            </div>
        </div>
    )
}
