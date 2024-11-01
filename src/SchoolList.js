import React from 'react';
import classes from './App.module.css';
import { Table, TableHead, TableRowHead, TableCellHead, TableBody, TableRow, TableCell } from '@dhis2/ui';

const SchoolList = ({ schools, loading, error, activePage, activePageHandler, activeIdHandler }) => {

	const organisationUnits = schools?.organisationUnits || [];

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!Array.isArray(organisationUnits) || organisationUnits.length === 0) {
        return <div>No schools found</div>;
    }

    return (
        <Table>
            <TableHead>
                <TableRowHead>
                    <TableCellHead>School Name</TableCellHead>
                </TableRowHead>
            </TableHead>
            <TableBody>
				{organisationUnits.map(school => {
					return (
						<TableRow 
                            className={`${classes.tableRowHover} ${classes.tableRow}`}
							key={school.id}
							label="SchoolInfo"
        					active={activePage === "SchoolInfo"} // Use strict equality
        					onClick={() => {activePageHandler("SchoolInfo"), activeIdHandler(school.id)}}
						>
							<TableCell>{school.displayName}</TableCell>
						</TableRow>
					)
				})}
            </TableBody>
        </Table>
    );
};

export default SchoolList;