import CompanyCard from './companies/CompanyCard';
import styles from './Text.module.css';

const SearchResults = ({ results, displayedResults, isAuthorized }) => {
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
