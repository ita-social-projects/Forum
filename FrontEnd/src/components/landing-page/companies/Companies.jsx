import axios from 'axios';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { useState, useEffect } from 'react';
import styles from './Companies.module.css';
import CompanyCard from '../../CompanyCard/CompanyCard';

const MainCompanies = (isAuthorized, userData) => {
  const baseUrl = process.env.REACT_APP_BASE_API_URL;
  const [searchResults, setSearchResults] = useState([]);
  const { mutate } = useSWRConfig();
  const [newMembers, setNewMembers] = useState(true);

  const fetcher = (url) => axios.get(url).then((res) => res.data.results);
  async function useNewMembers(url) {
    const data = await fetcher(url);
    setSearchResults(data);
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
  });

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
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCompanies;
