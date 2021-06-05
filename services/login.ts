// Out of the box imports
import { CognitoUserSession, ISignUpResult } from 'amazon-cognito-identity-js';
// Custom imports
import { getCognitoUserPool, getCognitoUser, getAuthDetails, getCurrentUser } from '@/services/cognito';
import { expireUserCookie } from '@/services/cookies';
import { populateUserAttributes } from '@/utils/services/cognitoUtils';

// Instance of the cognito user pool
const cognitoUserPool = getCognitoUserPool();

// Sign up a user
export const signUp = async (email: string, password: string, params: object) => {
    const userAttributes = populateUserAttributes(params);

    return await new Promise<ISignUpResult>((resolve, reject) => {
        cognitoUserPool.signUp(email, password, userAttributes, [], (error, data) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(data!);
        });
    });
};

// Sign in with real user credentials
export const signIn = async (email: string, password: string) => {
    const user = getCognitoUser(email, cognitoUserPool);
    const authDetails = getAuthDetails(email, password);

    return await new Promise<CognitoUserSession>((resolve, reject) => {
        user.authenticateUser(authDetails, {
            onSuccess: (data: CognitoUserSession) => resolve(data),
            onFailure: (error: Error) => reject(error),
        });
    });
};

// Sign out from the current user
export const signOut = () => {
    const user = getCurrentUser();

    if (user) {
        user.signOut();
        expireUserCookie();
        location.href = '/logout';
    }
};
