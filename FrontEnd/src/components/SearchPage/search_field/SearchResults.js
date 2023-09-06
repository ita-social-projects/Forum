import MainCompanies from './companies/Companies';
import './Text.css'

const SearchResults = ({ results, displayedResults }) => {
    let error = null;

    if (results && results.error) {
        error = results.error;
    }

    return (
        <div>
            {!error && (
                <>
                    <div className="new-companies-block">
                        <div className="row">
                            {displayedResults.map((result, resultIndex) => (
                                <div key={resultIndex} className="col-md-4">
                                    <MainCompanies companyData={result} />
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default SearchResults;
