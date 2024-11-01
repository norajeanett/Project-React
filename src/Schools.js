import React, { useState } from 'react';
import { useDataQuery } from '@dhis2/app-runtime';
import Search from './Search';
import SchoolList from './SchoolList';
import Pagination from './Pagination';
import SchoolListSize from './SchoolListSize';
import { schoolSearchQuery } from './api/api';

const Schools = ( {activePage, activePageHandler, activeIdHandler} ) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(0);
    const { loading, error, data, refetch } = useDataQuery(schoolSearchQuery, {
        variables: { searchWord: searchTerm, pageNumber: page, pageSize: pageSize },
    });

    // Extract schools data and total count of items
    const schools = data?.organisationUnits || [];
    
    const totalItems = data?.organisationUnitsCount?.organisationUnits?.length || 0;
    let totalPages = Math.ceil(totalItems / (pageSize ? pageSize : 10));


    const handleSearch = (term) => {
        setSearchTerm(term);
        setPage(1); 
        refetch({ searchWord: term, pageNumber: 1, pageSize: pageSize }).then((response) => {
            // Extract the count from the response after refetching
            const totalItems = response?.data?.organisationUnitsCount?.length || 0;
            totalPages = Math.ceil(totalItems / pageSize);  
        });
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            const newPage = page - 1;
            setPage(newPage);
            refetch({ searchWord: searchTerm, pageNumber: newPage, pageSize: pageSize });
        }
    };

    const handleNextPage = () => {
        if (page < totalPages) {
            const newPage = page + 1;
            setPage(newPage);
            refetch({ searchWord: searchTerm, pageNumber: newPage, pageSize: pageSize });
        }
    };

    const handlePageSize = (size) => {
        setPageSize(size);
        refetch( { pageSize: size });
    }

    return (
        <div>
            <Search onSearch={handleSearch} />
            <SchoolListSize handler={handlePageSize} />
            <SchoolList schools={schools} loading={loading} error={error} activePage={activePage} activePageHandler={activePageHandler} activeIdHandler={activeIdHandler}/>
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPrevious={handlePreviousPage}
                onNext={handleNextPage}
            />
        </div>
    );
};

export default Schools;