import CompanyCard from './companies/CompanyCard';
import styles from './Text.module.css';
import PropTypes from 'prop-types';

const SearchResults = ({ results, displayedResults, isAuthorized }) => {
  SearchResults.propTypes = {
    results: PropTypes.array,
    displayedResults: PropTypes.array,
    isAuthorized: PropTypes.object,
  };

  let error = null;

  if (results && results.error) {
    error = results.error;
  }

  return (
    <div>
      {!error && (
        <div className={styles['new-companies-block']}>
          <div className={styles['row']}>
            {displayedResults.map((result, resultIndex) => (
              <div key={resultIndex} className={styles['col-md-4']}>
                <CompanyCard companyData={result} isAuthorized={isAuthorized} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
