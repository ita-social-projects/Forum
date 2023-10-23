import axios from 'axios';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import SearchResults from './search_field/SearchResults';
import frame42 from './img/frame42.png';
import link_to_left from './img/link_to_left.svg';
import link_to_right from './img/link_to_right.svg';
import styles from './search_page.module.css';
import PropTypes from 'prop-types';

const ITEMS_PER_PAGE = 6;

export function Search({ isAuthorized }) {
  Search.propTypes = {
    isAuthorized: PropTypes.any.isRequired,
  };

  const [searchResults, setSearchResults] = useState([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get('name');
  const servedAddress = process.env.REACT_APP_BASE_API_URL;
  const searchUrl = 'search';
  const { mutate } = useSWRConfig();

  const fetcher = (url) => axios.get(url).then((res) => res.data);

  async function getRequest(url) {
    const data = await fetcher(url);
    setSearchResults(data);
    setSearchPerformed(true);
    setError(null);
  }

  const { trigger } = useSWRMutation(
    `${servedAddress}/api/search/?name=${searchTerm}`,
    getRequest
  );

  mutate((key) => typeof key === 'string' && key.startsWith('/api/search/'), {
    revalidate: true,
  });

  useEffect(() => {
    if (searchTerm) {
      try {
        trigger();
      } catch (error) {
        console.error(error);
      }
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
    <div className={styles['main_block_outer']}>
      <BreadCrumbs currentPage="Пошук" />
      <div className={styles['main_block']}>
        <img className={styles['frame-img-right']} src={frame42} alt="frame" />
        <div className={styles['new-companies-search_count']}>
          {searchResults && (
            <h3 className={styles['search_results_text']}>
              РЕЗУЛЬТАТІВ ЗА ПОШУКОМ{' '}
              <span className={styles['search_field_entered_value']}>
                {searchTerm}
              </span>{' '}
              : {searchResults.length > 0 ? searchResults.length : 0}
            </h3>
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
              />
              <br />
            </>
          ) : (
            <p className={styles['search_result_error']}>
              Пошук не дав результатів: компанії з іменем{' '}
              <span className={styles['.search_result_error']}>
                {searchTerm}
              </span>{' '}
              не було виявлено на даний момент
            </p>
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
