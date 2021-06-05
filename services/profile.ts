// Out of the box imports for the cognito library
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
// Custom imports
import { getCurrentUser } from '@/services/cognito';
import { setClientCookie } from '@/services/cookies';
import { populateUserAttributes } from '@/utils/services/cognitoUtils';

// Update the attributes of a user
export const updateUser = async (token: string, params: object) => {
    const user = getCurrentUser();
    const userAttributes = populateUserAttributes(params);

    return await new Promise<String>((resolve, reject) => {
        if (!user) {
            reject({ message: `There's no user logged in. Logging out` });
            return;
        }

        user.getSession((error: any, session: CognitoUserSession) => {
            if (error) {
                reject(error);
                return;
            }

            if (!session.isValid()) {
                reject({ message: `Session is not valid. Please Log in again` });
                return;
            }

            if (session.getIdToken().getJwtToken() !== token) {
                reject({ message: `Session and user tokens do not match. Please Log in again` });
                return;
            }

            user.updateAttributes(userAttributes, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                // After successfully updating the user attributes, update its token too
                refreshToken(user, resolve, reject);
            });
        });
    });
};

// Refresh the user token
export const refreshToken = (user: CognitoUser, resolve: Function, reject: Function) => {
    user.getSession((error: any, session: CognitoUserSession) => {
        if (error) {
            reject(error);
            return;
        }

        const jwtToken = session.getIdToken().getJwtToken();

        if (!session.isValid() || !jwtToken) {
            reject({ message: `Session is not valid anymore. Please Log in again` });
            return;
        }

        setClientCookie('jwtToken', jwtToken);
        resolve(jwtToken);
    });
};
