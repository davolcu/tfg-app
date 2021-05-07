// Out of the box imports
import { ReactNode } from 'react';

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
    userToken: string;
    pageProps?: object;
}

// Interface for the AuthPage context
export interface IAuthPageContext {
    user: object;
}
