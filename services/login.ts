// Custom imports
import { getCognitoUserPool, getCognitoUser, getAuthDetails, getUserAttributes } from '@/services/cognitoUserPool';
import { setClientCookie } from '@/services/cookies';

// Instance of the cognito user pool
const cognitoUserPool = getCognitoUserPool();

// Sign up a mocked user
export const signUp = (email: string, password: string, params: object) => {
    const userAttributes = getUserAttributes(params);

    cognitoUserPool.signUp(email, password, userAttributes, [], (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        location.href = '/profile';
    });
};

// Sign in with real user credentials
export const signIn = (email: string, password: string) => {
    const user = getCognitoUser(email, cognitoUserPool);
    const authDetails = getAuthDetails(email, password);

    user.authenticateUser(authDetails, {
        onSuccess: (data) => {
            const jwtToken = data.getIdToken().getJwtToken();

            if (jwtToken) {
                setClientCookie('jwtToken', jwtToken);
            }

            location.href = '/';
        },
        onFailure: (err) => {
            console.error(err);
        },
    });
};
