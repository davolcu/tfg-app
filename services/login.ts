// Custom imports
import { getCognitoUserPool, getCognitoUser, getAuthDetails, getUserAttributes } from '@/services/cognitoUserPool';
import { setClientCookie } from '@/services/cookies';
import { createToast } from '@/utils/utils';

// Instance of the cognito user pool
const cognitoUserPool = getCognitoUserPool();

// Sign up a user
export const signUp = (email: string, password: string, params: object) => {
    const userAttributes = getUserAttributes(params);

    cognitoUserPool.signUp(email, password, userAttributes, [], (err, data) => {
        if (err) {
            console.error(err);
            createToast({ text: err.message, type: 'error', duration: 3500 });
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
            createToast({ text: err.message, type: 'error', duration: 3500 });
        },
    });
};
