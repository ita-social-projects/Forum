import CompanyCard from '../../../components/CompanyCard/CompanyCard';
import styles from './SearchResulys.module.css';
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
    <div>
      {!error && (
        <div className={styles['new-companies-block']}>
          <div className={styles['row']}>
            {displayedResults.map((result, resultIndex) => (
              <div key={resultIndex} className={styles['col-md-4']}>
                <CompanyCard
                  profile={result}
                  isAuthorized={isAuthorized}
                  changeCompanies={changeCompanies}
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

SearchResults.propTypes = {
  results: PropTypes.array,
  displayedResults: PropTypes.array,
  isAuthorized: PropTypes.bool,
  changeCompanies: PropTypes.func,
};
