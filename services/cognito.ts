// Out of the box imports for the cognito library
import {
    CognitoUserPool,
    CognitoUser,
    CognitoUserSession,
    CognitoUserAttribute,
    AuthenticationDetails,
} from 'amazon-cognito-identity-js';

// User pool data from the AWS Cognito user pool
const USER_POOL_CREDENTIALS = {
    UserPoolId: 'eu-west-2_cs84M28p4',
    ClientId: '4k4sjkn1g07fofkf9boftkknv1',
};

// Export the cognito user pool from the user pool data
export const getCognitoUserPool = () => new CognitoUserPool(USER_POOL_CREDENTIALS);

// Constructor to create an instance of a cognito user
export const getCognitoUser = (Username: string, Pool: CognitoUserPool) => new CognitoUser({ Username, Pool });

// Constructor to create an instance of a authentication details
export const getAuthDetails = (Username: string, Password: string) => new AuthenticationDetails({ Username, Password });

// Exports the current user if it exists
export const getCurrentUser = () => {
    const userPool = getCognitoUserPool();
    return userPool.getCurrentUser();
};

// Exports the current user data if there's a user and its jwt token matches with the given one
export const getCurrentUserData = async (userToken: string) => {
    const user = getCurrentUser();

    return await new Promise<CognitoUserAttribute[]>((resolve, reject) => {
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
                reject({ message: `Session is not valid. Logging out` });
                return;
            }

            if (session.getIdToken().getJwtToken() !== userToken) {
                reject({ message: `Session and user tokens do not match. Logging out` });
                return;
            }

            user.getUserAttributes((err, attributes) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(attributes!);
            });
        });
    });
};
