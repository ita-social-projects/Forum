import React, { useState } from "react";
import {MainCompanies} from './companies/Companies';
import './Text.css'

const ITEMS_PER_PAGE = 6;

const SearchResults = ({ results, searchTerm }) => {
    let error = null;

    if (results && results.error) {
        error = results.error;
    }

    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = results.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const displayedResults = results.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            {!error && (
                <>
                    <div className="new-companies-block">
                        <div className="row">
                            {displayedResults.map((result, index) => (
                                <div key={index} className="col-md-4">
                                    <MainCompanies companyData={result} />
                                </div>
                            ))}
                        </div>
                    </div>
                    { totalItems > 6 && (
                        <div className="pagination">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={currentPage === i + 1 ? 'active' : ''}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}   
                </>
            )}
        </div>
    );
}

export default SearchResults;