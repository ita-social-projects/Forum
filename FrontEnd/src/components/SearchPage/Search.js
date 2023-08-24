import './search_page.css';
import frame42 from './img/frame42.png';
import React, { useState, useEffect } from 'react';
import SearchResults from './search_field/SearchResults';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

export function Search () {
    const [searchResults, setSearchResults] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [error, setError] = useState(null);

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get('search_field');

    useEffect(() => {
        if (searchTerm) {
            // Make an AJAX request to Django API to get search results
            axios.get(`http://localhost:8000/api/search/?search_field=${searchTerm}`)
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
    }, [searchTerm]);

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


// import './search_page.css';
// import frame42 from './img/frame42.png';
// import React, { useState} from 'react';
// import SearchBar from './search_field/SearchBar';
// import SearchResults from './search_field/SearchResults';
// import axios from 'axios';

// export function Search () {
//     const [searchResults, setSearchResults] = useState([]);
//     const [searchPerformed, setSearchPerformed] = useState(false);
//     const [searchTerm, setSearchTerm] = useState('');
//     let error = null;

//     const handleSearch = (searchTerm) => {

//         // Make an AJAX request to Django API to get search results
//         axios.get(`http://localhost:8000/api/search/?search_field=${searchTerm}`)               // send data to django
//             .then(response => {
//                 setSearchResults(response.data);                                                // put getted data from Django to searchResults
//             })
//             .catch(error => {                                                                   // if we get ay error while getting data
//                 console.error('Error fetching search results:', error);                         // print error in console
//             });

//         // console.log(SearchResults)
//         setSearchPerformed(true);
//         setSearchTerm(searchTerm);
//     };

//     if (searchResults && searchResults.error) {
//         error = searchResults.error;
//     }

//     return (
//         <div className='main_block'>
//             <img className='frame-img-right' src={frame42} alt="frame" />
//             <h2>Пошук компанії</h2>
//                 <SearchBar onSearch={handleSearch} />
//             <div className='new-companies-search_count'>
//                 {searchResults && <h3 className='search_results_text'>РЕЗУЛЬТАТІВ ЗА ПОШУКОМ <span className='search_field_entered_value'>{searchTerm}</span> : {searchResults.length > 0 ? searchResults.length : 0}</h3>}
//                 <br/>
//             </div>
//             <div className='new-companies-main'>
//                 {!error ? (
//                     <>
//                         <SearchResults results={searchResults} searchPerformed={searchPerformed} searchTerm={searchTerm} />
//                         <br/>
//                     </>
//                 ) : (
//                     <p className='search_result_error'>Пошук не дав результатів: компанії з іменем <span className='.search_result_error search_result_error_search_value'>{searchTerm}</span> не було виявлено на даний момент</p>
//                 )}
//             </div>
//         </div>
//     )
// }