// Custom imports
import { IUser, IEntity } from '@/interfaces/instances';

// Interface for the AuthPage context
export interface IAuthPageContext {
    user: IUser;
    setUser: Function;
    loaded: boolean;
}

// Interface for the EntitiesPage context
export interface IEntitiesPageContext {
    mode: string;
    setMode: Function;
    entities: IEntity[];
    setEntities: Function;
    activeEntity: IEntity | undefined;
    setActiveEntity: Function;
}
