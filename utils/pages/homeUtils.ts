// Custom imports
import { constants } from '@/helpers/pages/homeHelper';

/**
 * Method to generate the page data for the homepage
 */
export const getHomepageData = () => {
    // Set the data for the page instance
    const breadcrumbs = constants.HOME_BREADCRUMBS;
    const pageProps = constants.HOME_PROPS;
    const { title, subtitle } = constants.HOME_CONTAINER;

    return { breadcrumbs, pageProps, title, subtitle };
};
