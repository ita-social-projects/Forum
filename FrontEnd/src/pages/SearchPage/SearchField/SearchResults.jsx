import React from 'react';
import { Row, Col} from 'antd';
import CompanyCard from '../../../components/CompanyCard/CompanyCard';
import styles from './SearchResults.module.css';
import PropTypes from 'prop-types';

const SearchResults = ({
  results,
  displayedResults,
  isAuthorized,
  changeCompanies,
}) => {
  let error = null;

  if (results && results.error) {
    error = results.error;
  }

  return (
    <div className={styles['new-companies-block']}>
      {!error && (
          <Row className={styles['row']} gutter={[32, 32]}>
            {displayedResults.map((result, resultIndex) => (
              <Col className={styles['col']} key={resultIndex} xs={24} sm={24} md={12} lg={6}>
                <CompanyCard
                  profile={result}
                  isAuthorized={isAuthorized}
                  changeCompanies={changeCompanies}
                />
              </Col>
            ))}
          </Row>
      )}
    </div>
  );
};

export default SearchResults;

SearchResults.propTypes = {
  results: PropTypes.array,
  displayedResults: PropTypes.array,
  isAuthorized: PropTypes.bool,
  changeCompanies: PropTypes.func,
};
