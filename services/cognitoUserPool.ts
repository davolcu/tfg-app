// Out of the box imports for the cognito library
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js';

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

// Given some params construct the cognito user attributes list
export const getUserAttributes = (params: Object) => {
    const userAttributes: CognitoUserAttribute[] = [];

    Object.entries(params).forEach(([key, value]) => {
        userAttributes.push(new CognitoUserAttribute({ Name: key, Value: value }));
    });

    return userAttributes;
};
