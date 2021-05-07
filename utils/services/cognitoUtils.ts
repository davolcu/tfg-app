// Out of the box imports for the cognito library
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

// Given some params populate the cognito user attributes list
export const populateUserAttributes = (params: Object) => {
    const userAttributes: CognitoUserAttribute[] = [];

    Object.entries(params).forEach(([key, value]) => {
        userAttributes.push(new CognitoUserAttribute({ Name: key, Value: value }));
    });

    return userAttributes;
};

// Given some CognitoUserAttributes populate the user
export const populateUser = (userAttributes: CognitoUserAttribute[]) => {
    return userAttributes.reduce((acc, { Name, Value }) => {
        acc[Name] = Value;
        return acc;
    }, {} as { [key: string]: string });
};
