// Interfaces for the file
import { IParser } from '@/interfaces/instances';
// Custom imports
import { constants } from '@/helpers/pages/profileHelper';

/**
 * Method to generate the page data for the profile
 */
export const getProfilePageData = () => {
    // Set the data for the page instance
    const breadcrumbs = constants.PROFILE_BREADCRUMBS;
    const pageProps = constants.PROFILE_PROPS;
    const { title, subtitle } = constants.PROFILE_CONTAINER;

    return { breadcrumbs, pageProps, title, subtitle };
};

/**
 * Method to map the profile attributes to the user instance readable attributes
 * @param {Object} attributes: Profile attributes
 */
export const mapProfileAttributes = (attributes: object) => {
    const parser: IParser = constants.PROFILE_ATTRIBUTES_MAPPING;

    return Object.entries(attributes).reduce((acc, [key, value]) => {
        acc[parser[key]] = value;
        return acc;
    }, {} as { [key: string]: string });
};
