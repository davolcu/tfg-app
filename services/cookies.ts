// Out of the box imports
import { ServerResponse } from 'http';
import { GetServerSidePropsContext } from 'next';
import nookies from 'nookies';

// Removes a cookie
export const deleteCookie = (res: ServerResponse, key: string) => {
    nookies.destroy({ res }, key);
};

// Set a new client cookie to be used on the server requests
export const setClientCookie = (key: string, value: string) => {
    nookies.set(null, key, value, { maxAge: 60 * 60, path: '/' });
};

// Set a new server cookie
export const setServerCookie = (res: ServerResponse, key: string, value: string) => {
    nookies.set({ res }, key, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 60 * 60,
        sameSite: 'strict',
        path: '/',
    });
};

// Gets the user jwt token from the cookies and persists as server cookie the jwt token if needed
export const getUserCookie = ({ req, res }: GetServerSidePropsContext) => {
    const { jwtToken, userToken } = nookies.get({ req });

    if (jwtToken) {
        setServerCookie(res, 'userToken', jwtToken);
        deleteCookie(res, 'jwtToken');
        return jwtToken;
    }

    return userToken;
};
