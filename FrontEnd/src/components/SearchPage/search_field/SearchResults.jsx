import CompanyCard from '../../CompanyCard/CompanyCard';
import styles from './Text.module.css';
import PropTypes from 'prop-types';

import axios from 'axios';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { useState, useEffect } from 'react';

const SearchResults = ({
  results,
  displayedResults,
  isAuthorized,
  userData,
}) => {
  SearchResults.propTypes = {
    results: PropTypes.array,
    displayedResults: PropTypes.array,
    isAuthorized: PropTypes.any,
    userData: PropTypes.any,
  };

  const baseUrl = process.env.REACT_APP_BASE_API_URL;
  const authToken = localStorage.getItem('Token');
  const [savedList, setSavedList] = useState([]);
  const { mutate } = useSWRConfig();
  const [savedResults, setSavedResults] = useState(true);
  // console.log('search', isAuthorized, isAuthorized.isAuth);

  const fetcher = (url) =>
    axios
      .get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((res) => res.data.results);

  async function useSavedList(url) {
    const NewList = [];
    if (isAuthorized) {
      const data = await fetcher(url);
      for (let item of data) {
        NewList.push(item['company']);
      }
      setSavedList(NewList);
      setSavedResults(false);
      // console.log(NewList);
    }
  }

  // async function useSavedList(url) {
  //   const NewList = [];
  //   if (isAuthorized) {
  //     const datasavedlist = await axios
  //       .get(url, {
  //         withCredentials: true,
  //         headers: {
  //           Authorization: `Token ${authToken}`,
  //         },
  //       })
  //       .then((res) => res.data);
  //     for (let item of datasavedlist.results) {
  //       NewList.push(item['id']);
  //     }
  //     setSavedList(NewList);
  //   }
  //   console.log(NewList);
  //   return NewList;
  // }
  // console.log(!savedList);

  const { trigger } = useSWRMutation(
    `${baseUrl}/api/saved-list/`,
    useSavedList
  );
  mutate(
    (key) => typeof key === 'string' && key.startsWith('/api/saved-list/'),
    {
      revalidate: true,
    }
  );

  let error = null;

  if (results && results.error) {
    error = results.error;
  }
  useEffect(() => {
    if (savedResults) {
      try {
        trigger();
      } catch (error) {
        console.error(error);
      }
    }
  }, [savedList, trigger, savedResults]);

  return (
    <div>
      {!error && (
        <div className={styles['new-companies-block']}>
          <div className={styles['row']}>
            {displayedResults.map((result, resultIndex) => (
              <div key={resultIndex} className={styles['col-md-4']}>
                <CompanyCard
                  companyData={result}
                  isAuthorized={isAuthorized}
                  userData={userData}
                  savedList={savedList}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
