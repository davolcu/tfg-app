// Out of the box imports
import { createContext, FunctionComponent, useEffect, useState } from 'react';
// Interfaces of the component
import { IAuthPage, IAuthPageContext } from '@/interfaces/components';
// Custom imports
import Page from '@/components/Placeholder/Page';
import Header from '@/components/Generic/Header';
import Sidebar from '@/components/Generic/Sidebar';
import { getCurrentUser } from '@/services/cognito';
import { createToast } from '@/utils/utils';
import { populateUser } from '@/utils/services/cognitoUtils';

// Create the context for the auth pages
const contextDefaultValue: IAuthPageContext = { user: {} };
const AuthPageContext = createContext<IAuthPageContext>(contextDefaultValue);

const AuthPage: FunctionComponent<IAuthPage> = ({ children, token, pageProps }) => {
    const [user, setUser] = useState({ token });

    // Get the user given its token and the current context in an async way
    useEffect(() => {
        getCurrentUser(token)
            .then((data) => {
                setUser({ ...user, ...populateUser(data) });
            })
            .catch((error) => {
                console.error(error);
                createToast({ text: error.message, type: 'error', duration: 3500 });
                // TODO Logout
            });
    }, []);

    return (
        <AuthPageContext.Provider value={{ user }}>
            <Page {...pageProps}>
                <Header />
                <Sidebar />
                {children}
            </Page>
        </AuthPageContext.Provider>
    );
};

export { AuthPage, AuthPageContext };
