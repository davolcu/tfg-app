// Out of the box imports
import { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
// Interfaces of the component
import { IHomepage } from '@/interfaces/pages';
// Custom imports
import styles from '@/styles/modules/Home.module.scss';
import { AuthPage } from '@/components/Placeholder/AuthPage';
import { homeTitle } from '@/helpers/pages/homeHelper';
import { getUserCookie } from '@/services/cookies';

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Get the user's cookie based on the request
    const userToken = getUserCookie(context);

    if (!userToken) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: { userToken },
    };
};

const Home: FunctionComponent<IHomepage> = ({ userToken }) => {
    const pageProps = { title: homeTitle };

    return (
        <AuthPage userToken={userToken} pageProps={pageProps}>
            <main>HEY</main>
        </AuthPage>
    );
};

export default Home;
