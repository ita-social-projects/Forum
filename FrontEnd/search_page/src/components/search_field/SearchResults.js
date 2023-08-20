import React from "react";
import {MainCompanies} from './companies/Companies';

const SearchResults = ({ results, searchTerm }) => {
    let error = null;

    if (results && results.error) {
        error = results.error;
    }
    
    return (
        <div>
            {results && results.length > 0 && <h2>Результати за запитом: <b>{searchTerm}</b></h2>}
            {error ? (
                <h2><b>{error}</b></h2>
            ) : (
                <>
                    <div className="product-card">
                        {results.map((result, index) => (
                            <MainCompanies companyData={result} />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default SearchResults