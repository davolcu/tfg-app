// Out of the box imports for the cognito library
import {
    CognitoUserPool,
    CognitoUser,
    CognitoUserSession,
    CognitoUserAttribute,
    AuthenticationDetails,
} from 'amazon-cognito-identity-js';

// User pool data from the AWS Cognito user pool
const userPoolData = {
    UserPoolId: 'eu-west-2_cs84M28p4',
    ClientId: '4k4sjkn1g07fofkf9boftkknv1',
};

// Export the cognito user pool from the user pool data
export const getCognitoUserPool = () => new CognitoUserPool(userPoolData);

// Constructor to create an instance of a cognito user
export const getCognitoUser = (Username: string, Pool: CognitoUserPool) => new CognitoUser({ Username, Pool });

// Constructor to create an instance of a authentication details
export const getAuthDetails = (Username: string, Password: string) => new AuthenticationDetails({ Username, Password });

// Exports the current user if it exists and its jwt token matches with the given one
export const getCurrentUser = async (userToken: string) => {
    const userPool = getCognitoUserPool();
    const user = userPool.getCurrentUser();

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

            if (session.isValid() && session.getIdToken().getJwtToken() === userToken) {
                user.getUserAttributes((err, attributes) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve(attributes!);
                });
            }
        });
    });
};
