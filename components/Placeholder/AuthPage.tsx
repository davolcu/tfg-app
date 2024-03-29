// Out of the box imports
import { createContext, FunctionComponent, useEffect, useState } from 'react';
// Interfaces of the component
import { IAuthPage } from '@/interfaces/components';
import { IAuthPageContext } from '@/interfaces/contexts';
// Custom imports
import Page from '@/components/Placeholder/Page';
import Header from '@/components/Generic/Header';
import Sidebar from '@/components/Generic/Sidebar';
import { getCurrentUserData } from '@/services/cognito';
import { expireUserCookie } from '@/services/cookies';
import { createToast } from '@/utils/utils';
import { populateUser } from '@/utils/services/cognitoUtils';

// Create the context for the auth pages
const contextDefaultValue: IAuthPageContext = { user: {}, setUser: () => ({}), loaded: false };
const AuthPageContext = createContext<IAuthPageContext>(contextDefaultValue);

const AuthPage: FunctionComponent<IAuthPage> = ({ children, token, pageProps, items, showSidebar = true }) => {
    const [user, setUser] = useState({ token });
    const [loaded, setLoaded] = useState(false);

    // Handler to update the user from any other component which implements the context
    const userUpdateHandler = (params: object) => setUser({ ...user, ...params });

    // Get the user given its token and the current context in an async way
    useEffect(() => {
        getCurrentUserData(token)
            .then((data) => {
                setUser({ ...user, ...populateUser(data) });
                setLoaded(true);
            })
            .catch((error) => {
                console.error(error);
                createToast({ text: error.message, type: 'error', duration: 3500 });
                expireUserCookie();
                location.href = '/login';
            });
    }, []);

    return (
        <AuthPageContext.Provider value={{ user, setUser: userUpdateHandler, loaded }}>
            <Page {...pageProps}>
                <Header />
                {showSidebar && !!items?.length && <Sidebar items={items} />}
                {children}
            </Page>
        </AuthPageContext.Provider>
    );
};

export { AuthPage, AuthPageContext };
