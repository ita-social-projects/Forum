import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './Companies.module.css';
import CompanyCard from '../../CompanyCard/CompanyCard';
import PropTypes from 'prop-types';
import useSWR from 'swr';

const MainCompanies = ({ isAuthorized }) => {
  const baseUrl = process.env.REACT_APP_BASE_API_URL;
  const [searchResults, setSearchResults] = useState([]);
  const [newMembers, setNewMembers] = useState(true);
  const authToken = localStorage.getItem('Token');
  const headers = authToken
    ? {
        withCredentials: true,
        headers: {
          Authorization: `Token ${authToken}`,
        },
      }
    : {
        'Content-Type': 'application/json',
      };
  const fetcher = async (url) => {
    await axios.get(url, headers).then((res) => {
      setSearchResults(res.data.results);
      return res.data.results;
    });
  };

  const { data: companylist } = useSWR(
    `${baseUrl}/api/profiles/?new_members=-completeness,-created_at`,
    fetcher
  );

  useEffect(() => {
    if (newMembers) {
      setNewMembers(false);
    }
  }, [newMembers, authToken, companylist]);
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
              <CompanyCard profile={result} isAuthorized={isAuthorized} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCompanies;

MainCompanies.propTypes = {
  isAuthorized: PropTypes.bool,
};
