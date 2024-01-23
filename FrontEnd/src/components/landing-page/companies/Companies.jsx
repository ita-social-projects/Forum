import axios from 'axios';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { useState, useEffect } from 'react';
import styles from './Companies.module.css';
import CompanyCard from '../../CompanyCard/CompanyCard';

const MainCompanies = (isAuthorized, userData) => {
  const baseUrl = process.env.REACT_APP_BASE_API_URL;
  const authToken = localStorage.getItem('Token');
  const [searchResults, setSearchResults] = useState([]);
  const { mutate } = useSWRConfig();
  const [newMembers, setNewMembers] = useState(true);
  const [savedList, setSavedList] = useState([]);
  const authorizedUser = isAuthorized.isAuthorized.isAuthorized;

  async function useSavedList(url) {
    const NewList = [];
    if (authorizedUser) {
      // const data = await fetcherSavedList(url, {
      //   withCredentials: true,
      //   headers: {
      //     Authorization: `Token ${authToken}`,
      //   },
      // });
      const datasavedlist = await axios
        .get(url, {
          withCredentials: true,
          headers: {
            Authorization: `Token ${authToken}`,
          },
        })
        .then((res) => res.data);
      // console.log(datasavedlist);
      for (let item of datasavedlist.results) {
        NewList.push(item['id']);
      }
      setSavedList(NewList);
      // console.log(NewList);
    }
    return NewList;
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
  // const fetcherSavedList = (url, credentials) =>
  //   axios.get(url, credentials).then((res) => res.data);
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
                isAuthorized={authorizedUser}
                userData={userData}
                savedList={savedList}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCompanies;
