// Out of the box imports
import pluralize from 'pluralize';
// Interfaces for the file
import { IEntities } from '@/interfaces/instances';

export const getSidebarItems = (entities?: IEntities) => {
    if (!!entities?.statusCode) {
        return [];
    }

    return Object.entries(entities ?? []).map(([_, { id, name, description }]) => ({
        id,
        value: pluralize(name),
        description,
        link: `/entities/${id}`,
    }));
};
