// Out of the box imports
import { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
// Interfaces of the component
import { IHomepage } from '@/interfaces/pages';
// Custom imports
import styles from '@/styles/modules/Home.module.scss';
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

const Home: FunctionComponent<IHomepage> = ({ token }) => {
    const pageProps = { title: 'Dashboard' };

    return (
        <AuthPage token={token} pageProps={pageProps}>
            <main className={styles.home}>HEY</main>
        </AuthPage>
    );
};

export default Home;
