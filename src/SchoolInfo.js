import React from 'react';
import { useDataQuery } from '@dhis2/app-runtime';
import { inspections } from './api/api';
import classes from './App.module.css';
import { Table, TableHead, TableRowHead, TableCellHead, TableBody, TableRow, TableCell } from '@dhis2/ui';

const SchoolInfo = ({ id }) => {
    console.log(id)
    const { loading, error, data } = useDataQuery(inspections, {
        variables: { id: id },
    });
    console.log(data)

    // Check loading state first
    if (loading) {
        return <div>Loading...</div>;
    }

    // Check for errors
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Check if data is available and if events are an array
    const organisationUnit = data?.events.events || [];
    console.log(organisationUnit.orgUnitName)

    // Handle case where no inspections are found
    if (!Array.isArray(organisationUnit) || organisationUnit.length === 0) {
        return <div>No Inspections For School</div>;
    }


    // Render school information if available
    return (
        <div>
            <h1>{organisationUnit[0].orgUnitName}</h1>
            <h2>Inspections</h2>
                <Table>
                <TableHead>
                    <TableRowHead>
                        <TableCellHead>Report Date</TableCellHead>
                        <TableCellHead>Status</TableCellHead>
                    </TableRowHead>
                </TableHead>
                <TableBody>
                    {organisationUnit.map(school => {
                        return (
                            <TableRow
                                className={classes.tableRowHover} 
                                key={school.id}>
                                <TableCell>{school.eventDate}</TableCell>
                                <TableCell>{school.status}</TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default SchoolInfo;