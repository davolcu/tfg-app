// Out of the box imports
import { FunctionComponent } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

// Interface for the User entity
export interface IUser {
    [key: string]: string;
}

// Interface for the Header dropdown options
export interface IHeaderDropdownOption {
    id: string;
    value: string;
    icon?: IconDefinition;
    callback?: Function;
}

// Interface for the Sidebar item
export interface ISidebarItem {
    id: string;
    value: string;
    link: string;
}

// Interface for the Navigation bar Breadcrumbs
export interface IBreadcrumb {
    id: string;
    value: string;
    link?: string;
    image?: string;
}

// Interface for the Parser instance
export interface IParser {
    [key: string]: string;
}

// Interface for the Function Component parser instance
export interface IParserFunctionComponent {
    [key: string]: FunctionComponent<any>;
}

// Interface for the Strings parser instance
export interface IParserString {
    [key: string]: string | Function;
}

// Interface for the Attribute instances of the list
export interface IAttribute {
    [key: string]: string;
}

// Interface for the Metadata instance
export interface IMetadata {
    name: string;
    id: string;
    description?: string;
    attributeList: IAttribute[];
}

// Interface for the Entity instances
export interface IEntity {
    [key: string]: string | number;
}

// Interface for the Entity List data async response
export interface IEntitiesData {
    Metadata: IMetadata;
    Count: number;
    Items: IEntity[];
    ScannedCount: number;
}

// Interface for the Entity Instance data async response
export interface IEntityData {
    Metadata: IMetadata;
    Item: IEntity;
}

// Interface for the Entity List request query
export interface IEntityQuery {
    [key: string]: string;
}

// Interface for the Entities of the user's project
export interface IEntities {
    [key: string]: IMetadata;
}
