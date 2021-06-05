// Out of the box imports
import { ServerResponse } from 'http';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

// Default options to be used when setting a new client cookie
const DEFAULT_CLIENT_OPTIONS = { maxAge: 60 * 60, path: '/' };

// Default options to be used when setting a new server cookie
const DEFAULT_SERVER_OPTIONS = {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60,
    sameSite: 'strict',
    path: '/',
};

// Removes a cookie
export const deleteCookie = (key: string, res?: ServerResponse) => {
    nookies.destroy(res ? { res } : null, key);
};

// Set a new client cookie to be used on the server requests
export const setClientCookie = (key: string, value: string, options?: object) => {
    nookies.set(null, key, value, options ?? DEFAULT_CLIENT_OPTIONS);
};

// Set a new server cookie
export const setServerCookie = (res: ServerResponse, key: string, value: string, options?: object) => {
    nookies.set({ res }, key, value, options ?? DEFAULT_SERVER_OPTIONS);
};

// Gets the user jwt token from the cookies and persists as server cookie the jwt token if needed
export const getUserCookie = ({ req, res }: GetServerSidePropsContext) => {
    const { jwtToken, userToken, expireToken } = nookies.get({ req });

    if (expireToken !== undefined) {
        deleteCookie('userToken', res);
        deleteCookie('userProject', res);
        deleteCookie('expireToken', res);
        return;
    }

    if (jwtToken) {
        setServerCookie(res, 'userToken', jwtToken);
        deleteCookie('jwtToken', res);
        return jwtToken;
    }

    return userToken;
};

// Gets the user project token from the cookies
export const getProjectCookie = ({ req, res }: GetServerSidePropsContext) => {
    const { userProject, expireProject } = nookies.get({ req });

    if (expireProject !== undefined) {
        deleteCookie('userProject', res);
        deleteCookie('expireProject', res);
        return;
    }

    return userProject;
};

// Forces the user token cookie to expire
export const expireUserCookie = () => {
    setClientCookie('expireToken', '');
};

// Forces the user project cookie to expire
export const expireUserProject = () => {
    setClientCookie('expireProject', '');
};
