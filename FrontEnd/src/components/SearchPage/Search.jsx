import axios from 'axios';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import SearchResults from './search_field/SearchResults';
import frame42 from './img/frame42.png';
import link_to_left from './img/link_to_left.svg';
import link_to_right from './img/link_to_right.svg';
import styles from './search_page.module.css';
import PropTypes from 'prop-types';
import useSWR from 'swr';

const ITEMS_PER_PAGE = 6;

export function Search({ isAuthorized }) {
  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('name');
  const servedAddress = process.env.REACT_APP_BASE_API_URL;
  const searchUrl = 'search';

  const fetcher = async (url) => {
    const response = await axios.get(url);
    setSearchResults(response.data);
  };

  const { data: companylist, error } = useSWR(
    `${servedAddress}/api/search/?name=${searchTerm}&ordering=name`,
    fetcher
  );

  const changeCompanies = (id, isSaved) => {
    const newCompanies = [...searchResults];
    for (let company of newCompanies) {
      if (company.id == id) {
        company.is_saved = isSaved;
      }
    }
    setSearchResults(newCompanies);
  };

  useEffect(() => {
    if (searchTerm) {
      setSearchPerformed(true);
    }
  }, [searchTerm, servedAddress, searchUrl, companylist]);

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
    <div className={styles['main_block_outer']}>
      <BreadCrumbs currentPage="Пошук" />
      <div className={styles['main_block']}>
        <img className={styles['frame-img-right']} src={frame42} alt="frame" />
        <div className={styles['new-companies-search_count']}>
          {searchResults && (
            <div>
              <h3 className={styles['search_results_text']}>
                РЕЗУЛЬТАТІВ ЗА ПОШУКОМ
                <span className={styles['search_field_entered_value']}>
                  {` ${searchTerm} `}
                </span>
                : {searchResults.length > 0 ? searchResults.length : 0}
              </h3>
              <br />
            </div>
          )}
          <br />
        </div>
        <div className={styles['new-companies-main']}>
          {!error && searchResults.length > 0 ? (
            <>
              <SearchResults
                results={searchResults}
                searchPerformed={searchPerformed}
                displayedResults={displayedResults}
                isAuthorized={isAuthorized}
                changeCompanies={changeCompanies}
              />
              <br />
            </>
          ) : (
            <div>
              <br />
              <p className={styles['search_result_error']}>
                Пошук не дав результатів: компанії з іменем
                <span className={styles['.search_result_error']}>
                  {` ${searchTerm} `}
                </span>
                не було виявлено на даний момент
              </p>
            </div>
          )}
        </div>
        <div className={styles['new-companies-result_pages']}>
          {totalPages > 1 && (
            <div className={styles['pagination']}>
              {currentPage > 1 && (
                <button onClick={() => handlePageChange(currentPage - 1)}>
                  <img src={link_to_left} alt="Link to Left" />
                </button>
              )}
              {currentPage > 1 && (
                <>
                  <button onClick={() => handlePageChange(1)}>1</button>
                  {currentPage > 2 && (
                    <span className={styles['ellipsis']}>...</span>
                  )}
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
                    <span className={styles['ellipsis']}>...</span>
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

export default Search;

Search.propTypes = {
  isAuthorized: PropTypes.bool,
};

Search.propTypes = {
  isAuthorized: PropTypes.bool,
};
