import React from 'react';

const Pagination = ({ currentPage, totalPages, onPrevious, onNext }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
            <button onClick={onPrevious} disabled={currentPage <= 1} style={{ marginRight: '1rem' }}>
                Previous
            </button>

            <span style={{ margin: '0 1rem' }}>
                Page {currentPage} of {totalPages}
            </span>

            <button onClick={onNext} disabled={currentPage >= totalPages} style={{ marginLeft: '1rem' }}>
                Next
            </button>
        </div>
    );
};

export default Pagination;
