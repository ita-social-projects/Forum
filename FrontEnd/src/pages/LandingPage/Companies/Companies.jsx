import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Companies.module.css';
import CompanyCard from '../../../components/CompanyCard/CompanyCard';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { Col, Row } from 'antd';

const MainCompanies = ({ isAuthorized }) => {
  const baseUrl = process.env.REACT_APP_BASE_API_URL;
  const [searchResults, setSearchResults] = useState([]);
  const [newMembers, setNewMembers] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const fetcher = async (url) => {
    const data = await axios.get(url);
    setSearchResults(data.data.results);
    return data.data.results;
  };

  const { data: companylist } = useSWR(
    `${baseUrl}/api/profiles/?ordering=-completeness,-created_at&page_size=4`,
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
    if (newMembers) {
      setNewMembers(false);
    }
  }, [newMembers, companylist, searchResults]);
  const companyDataList = searchResults;
  const linkText = windowWidth>500 ? 'Всі підприємства' : 'Всі';

  return (
    <div className={styles['new-companies-main']}>
      <div className={styles['new-companies-main__header']}>
        <h2 className={styles['new-companies-main__title']}>
          Нові учасники
        </h2>
        <div className={styles['new-companies-link-to-all']}>
          <Link to="profiles/companies">
            <p>{linkText}<svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.768024 7.90895L12.5223 7.90895L5.487 14.0161C5.3745 14.1145 5.4428 14.2973 5.59146 14.2973L7.36936 14.2973C7.44771 14.2973 7.52204 14.2692 7.5803 14.219L15.172 7.63172C15.2416 7.57145 15.2973 7.49694 15.3356 7.41323C15.3738 7.32953 15.3936 7.23858 15.3936 7.14657C15.3936 7.05455 15.3738 6.96361 15.3356 6.8799C15.2973 6.79619 15.2416 6.72168 15.172 6.66141L7.53611 0.0339549C7.50597 0.00783851 7.46981 -0.00622437 7.43164 -0.00622437L5.59347 -0.00622454C5.44481 -0.00622455 5.37651 0.178598 5.48901 0.275025L12.5223 6.38217L0.768024 6.38217C0.679632 6.38217 0.60731 6.45449 0.60731 6.54288L0.60731 7.74824C0.60731 7.83663 0.679632 7.90895 0.768024 7.90895Z" fill="black" fillOpacity="0.85" />
            </svg>
            </p>
          </Link>
        </div>
      </div>
      <div className={styles['new-companies-block']}>
        <Row justify={'center'} gutter={[16, 16]}>
          {companyDataList.map((result, resultIndex) => (
            <Col key={resultIndex} xs={24} sm={12} lg={6}>
              <CompanyCard
                profile={result}
                isAuthorized={isAuthorized}
                changeCompanies={changeCompanies}
              />
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default MainCompanies;

MainCompanies.propTypes = {
  isAuthorized: PropTypes.bool,
};
