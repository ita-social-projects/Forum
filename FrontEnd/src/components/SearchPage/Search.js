import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import SearchResults from './search_field/SearchResults';
import frame42 from './img/frame42.png';
import link_to_left from './img/link_to_left.svg';
import link_to_right from './img/link_to_right.svg';
import './search_page.module.css';

const ITEMS_PER_PAGE = 6;

export function Search(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('name');
  const servedAddress = process.env.REACT_APP_BASE_API_URL;
  const searchUrl = 'search';

  useEffect(() => {
    if (searchTerm) {
      // Make an AJAX request to Django API to get search results
      axios
        .get(`${servedAddress}/api/search/?name=${searchTerm}`)
        .then((response) => {
          setSearchResults(response.data);
          setSearchPerformed(true);
          setError(null); // Clear error on successful response
        })
        .catch((error) => {
          console.error('Error fetching search results:', error);
          setError(error.response ? error.response.data : 'An error occurred');
        });
    }
  }, [searchTerm, servedAddress, searchUrl]);

  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = searchResults.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedResults = searchResults.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="main_block_outer">
      <BreadCrumbs currentPage="Пошук" />
      <div className="main_block">
        <img className="frame-img-right" src={frame42} alt="frame" />
        <div className="new-companies-search_count">
          {searchResults && (
            <h3 className="search_results_text">
              РЕЗУЛЬТАТІВ ЗА ПОШУКОМ{' '}
              <span className="search_field_entered_value">{searchTerm}</span> :{' '}
              {searchResults.length > 0 ? searchResults.length : 0}
            </h3>
          )}
          <br />
        </div>
        <div className="new-companies-main">
          {!error && searchResults.length > 0 ? (
            <>
              <SearchResults
                results={searchResults}
                searchPerformed={searchPerformed}
                displayedResults={displayedResults}
                isAuthorized={props.isAuthorized}
              />
              <br />
            </>
          ) : (
            <p className="search_result_error">
              Пошук не дав результатів: компанії з іменем{' '}
              <span className=".search_result_error search_result_error_search_value">
                {searchTerm}
              </span>{' '}
              не було виявлено на даний момент
            </p>
          )}
        </div>
        <div className="new-companies-result_pages">
          {totalPages > 1 && (
            <div className="pagination">
              {currentPage > 1 && (
                <button onClick={() => handlePageChange(currentPage - 1)}>
                  <img src={link_to_left} alt="Link to Left" />
                </button>
              )}
              {currentPage > 1 && (
                <>
                  <button onClick={() => handlePageChange(1)}>1</button>
                  {currentPage > 2 && <span className="ellipsis">...</span>}
                </>
              )}
              {Array.from({ length: totalPages }, (_, i) => {
                if (
                  i === 2 ||
                  i === totalPages ||
                  (i >= currentPage - 1 && i <= currentPage)
                ) {
                  return (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={currentPage === i + 1 ? 'active' : ''}
                    >
                      {i + 1}
                    </button>
                  );
                }
                return null;
              })}
              {currentPage < totalPages - 1 && (
                <>
                  {currentPage < totalPages - 1 && (
                    <span className="ellipsis">...</span>
                  )}
                  <button onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                  </button>
                </>
              )}
              {currentPage < totalPages && (
                <button onClick={() => handlePageChange(currentPage + 1)}>
                  <img src={link_to_right} alt="Link to Right" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
