// Out of the box imports
import { ReactNode } from 'react';
// Custom imports
import {
    IEntityData,
    IEntitiesData,
    IEntityQuery,
    IBreadcrumb,
    IHeaderDropdownOption,
    ISidebarItem,
} from '@/interfaces/instances';

// Interface for the Page component
export interface IPage {
    children: ReactNode;
    title?: string;
    description?: string;
    keywords?: string;
}

// Interface for the AuthPage component
export interface IAuthPage {
    children: ReactNode;
    token: string;
    showSidebar?: boolean;
    pageProps?: object;
    items?: ISidebarItem[];
}

// Interface for the Dropdown component
export interface IDropdown {
    options: IHeaderDropdownOption[];
}

// Interface for the Navigation bar component
export interface INavigationBar {
    breadcrumbs: IBreadcrumb[];
}

// Interface for the Container component
export interface IContainer {
    children: ReactNode;
    title?: string;
    subtitle?: string;
}

// Interface for the Sidebar component
export interface ISidebar {
    items: ISidebarItem[];
}

// Interface for the Loader component
export interface ILoader {
    size?: string;
}

// Interface for the Input component
export interface IInput {
    name?: string;
    type?: string;
    step?: string;
    min?: string;
    max?: string;
    value?: string | number;
    label?: string;
    placeholder?: string;
    id?: string;
    style?: object;
    setter: Function;
}

// Interface for the RichTextarea component
export interface IRichTextarea {
    config?: object;
    label?: string;
    value?: string;
    style?: object;
    setter: Function;
}

// Interface for the EntitiesPage component
export interface IEntitiesPage {
    token: string;
    query: IEntityQuery;
    data: IEntitiesData;
    items: ISidebarItem[];
}

// Interface for the EntitiesCount component
export interface IEntitiesCount {
    count: number;
    name: string;
}

// Interface for the EntitiesEmpty component
export interface IEntitiesEmpty {
    name: string;
}

// Interface for the EntitiesList component
export interface IEntitiesList {
    data: IEntitiesData;
}

// Interface for the IEntitiesForm component
export interface IEntitiesForm {
    data: IEntitiesData;
}

// Interface for the IEntityForm component
export interface IEntityForm {
    data: IEntityData;
}

// Interface for the IHomeCard component
export interface IHomeCard {
    value: string;
    link: string;
    description?: string;
}
