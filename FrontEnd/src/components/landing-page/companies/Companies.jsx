import axios from 'axios';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { useState, useEffect } from 'react';
import styles from './Companies.module.css';
import CompanyCard from '../../CompanyCard/CompanyCard';
import PropTypes from 'prop-types';

const MainCompanies = ({ isAuthorized, userData }) => {
  MainCompanies.propTypes = {
    isAuthorized: PropTypes.any,
    userData: PropTypes.any,
  };

  const baseUrl = process.env.REACT_APP_BASE_API_URL;
  const authToken = localStorage.getItem('Token');
  const [searchResults, setSearchResults] = useState([]);
  const { mutate } = useSWRConfig();
  const [newMembers, setNewMembers] = useState(true);
  const [savedList, setSavedList] = useState([]);

  const fetchersavedList = (url) =>
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
      const data = await fetchersavedList(url);
      for (let item of data) {
        NewList.push(item['company']);
      }
      setSavedList(NewList);
    }
  }

  const { trigger: triggerget } = useSWRMutation(
    `${baseUrl}/api/saved-list/`,
    useSavedList
  );
  mutate(
    (key) => typeof key === 'string' && key.startsWith('/api/saved-list/'),
    {
      revalidate: true,
    }
  );

  const fetcher = (url) => axios.get(url).then((res) => res.data.results);
  async function useNewMembers(url) {
    const data = await fetcher(url);
    setSearchResults(data);
    setNewMembers(false);
    triggerget();
  }

  const { trigger } = useSWRMutation(
    `${baseUrl}/api/profiles/?new_members=-completeness,-created_at`,
    useNewMembers
  );

  mutate((key) => typeof key === 'string' && key.startsWith('/api/profiles/'), {
    revalidate: true,
  });

  useEffect(() => {
    if (newMembers) {
      try {
        trigger();
        setNewMembers(false);
      } catch (error) {
        console.error(error);
      }
    }
  }, [newMembers, trigger]);
  const companyDataList = searchResults;

  return (
    <div className={styles['new-companies-main']}>
      <div className={styles['new-companies']}>
        <div className={styles['new-companies-main__header']}>
          Нові учасники
        </div>
      </div>
      <div className={styles['new-companies-block']}>
        <div className={styles['row']}>
          {companyDataList.map((result, resultIndex) => (
            <div key={resultIndex} className={styles['col-md-4']}>
              <CompanyCard
                companyData={result}
                isAuthorized={isAuthorized}
                userData={userData}
                // savedList={savedList}
                issaved={savedList.includes(result.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCompanies;
