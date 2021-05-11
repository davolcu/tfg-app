// Out of the box imports
import { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
// Interfaces of the component
import { IProfile } from '@/interfaces/pages';
// Custom imports
import styles from '@/styles/modules/Profile.module.scss';
import { AuthPage } from '@/components/Placeholder/AuthPage';
import { getUserCookie } from '@/services/cookies';

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Get the user's cookie based on the request
    const token = getUserCookie(context);

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: { token },
    };
};

const Home: FunctionComponent<IProfile> = ({ token }) => {
    const pageProps = { title: 'Profile' };

    return (
        <AuthPage token={token} pageProps={pageProps}>
            <main className={styles.profile}>HEY</main>
        </AuthPage>
    );
};

export default Home;
