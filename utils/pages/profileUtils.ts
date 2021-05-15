// Interfaces for the file
import { IParser } from '@/interfaces/utils';
// Custom imports
import { constants } from '@/helpers/pages/profileHelper';

/**
 * Method to map the profile attributes to the user instance readable attributes
 * @param {Object} attributes: Profile attributes
 */
export const mapProfileAttributes = (attributes: Object) => {
    const parser: IParser = constants.PROFILE_ATTRIBUTES_MAPPING;

    return Object.entries(attributes).reduce((acc, [key, value]) => {
        acc[parser[key]] = value;
        return acc;
    }, {} as { [key: string]: string });
};
