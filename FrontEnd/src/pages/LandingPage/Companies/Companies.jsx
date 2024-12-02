import axios from 'axios';
import { useState } from 'react';
import useWindowWidth from '../../../hooks/useWindowWidth';
import { Link } from 'react-router-dom';
import styles from './Companies.module.css';
import Loader from '../../../components/Loader/Loader';
import CompanyCard from '../../../components/CompanyCard/CompanyCard';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import { Col, Row } from 'antd';

const MainCompanies = ({ isAuthorized }) => {
  const baseUrl = process.env.REACT_APP_BASE_API_URL;
  const [searchResults, setSearchResults] = useState(null);
  const windowWidth = useWindowWidth();

  const fetcher = async (url) => {
    const data = await axios.get(url);
    return data.data.results;
  };

  useSWR(
    `${baseUrl}/api/profiles/?ordering=-completeness,-created_at&page_size=4`,
    fetcher,
    {onSuccess: (data) => setSearchResults(data)}
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

  const linkText = windowWidth >= 768 ? 'Всі підприємства' : 'Всі';
  const antdGutter = windowWidth >= 1200 ? [24, 24] : [0, 24];
  const antdWrap = windowWidth < 1200;

  return (
    <div className={styles['new-companies-main']}>
      <div className={styles['new-companies-main__header']}>
        <h2 className={styles['new-companies-main__title']}>
          Нові учасники
        </h2>
        <div className={styles['new-companies-link-to-all']}>
          <Link to="profiles">
            <p>{linkText}
              <img src="svg/arrow.svg" alt="Arrow icon for all companies link" />
            </p>
          </Link>
        </div>
      </div>
      <div className={styles['new-companies-block']}>
        {searchResults ?
        <Row justify={'start'} gutter={antdGutter} wrap={antdWrap}>
          {searchResults?.map((result, resultIndex) => (
            <Col key={resultIndex} xs={24} md={12} xl={8} xxl={6}>
              <CompanyCard
                profile={result}
                isAuthorized={isAuthorized}
                changeCompanies={changeCompanies}
              />
            </Col>
          ))}
        </Row>
        :
        <Loader />}
      </div>
    </div>
  );
};

export default MainCompanies;

MainCompanies.propTypes = {
  isAuthorized: PropTypes.bool,
};
