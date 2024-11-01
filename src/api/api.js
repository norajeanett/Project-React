import { useDataQuery } from '@dhis2/app-runtime';

const datasetsQuery = {
    // object contains structure of request used for getting dataSets from the api
    dataSets: {
        resource: 'dataSets',
        params: {
            fields: [
                'id',
                'displayName',
                'created',
            ],
            paging: "false",
        },
    },
}

//Trenger ikke custom hook, det gjør det bare vanskeligere
//Det er mulig vi ikke trenger custom hooks til noe i det hele tatt
export const schoolSearchQuery = {
    organisationUnits: {
        resource: 'organisationUnits',
        params: ({ searchWord, pageNumber, pageSize }) => ({
            fields: ['id', 'displayName'],
            page: pageNumber,
            pageSize: pageSize > 0 ? pageSize : 10,
            paging: 'true',
            filter: searchWord ? `displayName:ilike:${searchWord}` : undefined,
        }),
    },
    organisationUnitsCount: {
        resource: 'organisationUnits',
        params: ({ searchWord }) => ({
            fields: ['id'],
            paging: 'false', // Return all items to determine total count
            filter: searchWord ? `displayName:ilike:${searchWord}` : undefined, 
        }),
    },
};

export const inspections = {
    events: {
        resource: 'events',
        params: ({ id }) => ({
            fields: [
				'orgUnit',
				'orgUnitName',
                'status',
                'eventDate'
			],
            pageSize: 10,
            orgUnit: id,
        }),
    },
};

export const useDatasets = () => {
    const { loading, error, data} = useDataQuery(datasetsQuery);
    
    return { loading, error, data };
}
