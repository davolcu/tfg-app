// Custom imports
import { IEntityQuery, IEntitiesData, IEntityData, IEntities } from '@/interfaces/instances';

// Interface for the Homepage
export interface IHomepage {
    token: string;
    data: IEntities;
}

// Interface for the Profile view
export interface IProfile {
    token: string;
    data?: IEntities;
}

// Interface for the Entities view
export interface IEntitiesView {
    token: string;
    query: IEntityQuery;
    data: IEntitiesData;
    entities: IEntities;
}

// Interface for the Entity view
export interface IEntityView {
    token: string;
    data: IEntityData;
    entities: IEntities;
}
