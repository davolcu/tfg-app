// Custom imports
import { IEntityQuery, IEntitiesData, IEntityData } from '@/interfaces/instances';

// Interface for the Homepage
export interface IHomepage {
    token: string;
}

// Interface for the Profile view
export interface IProfile {
    token: string;
}

// Interface for the Entities view
export interface IEntitiesView {
    token: string;
    query: IEntityQuery;
    data: IEntitiesData;
}

// Interface for the Entity view
export interface IEntityView {
    token: string;
    data: IEntityData;
}
