// Out of the box imports
import { ReactNode } from 'react';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

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
}

// Interface for the User entity
export interface IUser {
    [key: string]: string;
}

// Interface for the AuthPage context
export interface IAuthPageContext {
    user: IUser;
    loaded: boolean;
}

// Interface for the Header dropdown options
export interface IHeaderDropdownOption {
    id: string;
    value: string;
    icon?: IconDefinition;
    callback?: Function;
}

// Interface for the Dropdown component
export interface IDropdown {
    options: IHeaderDropdownOption[];
}

// Interface for the Sidebar item
export interface ISidebarItem {
    id: string;
    image: string;
}

// Interface for the Navigation bar Breadcrumbs
export interface IBreadcrumb {
    id: string;
    value: string;
    link?: string;
    image?: string;
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
    setter: Function;
}
