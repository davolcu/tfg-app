// Out of the box imports
import { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
// Interfaces of the component
import { IHomepage } from '@/interfaces/pages';
// Custom imports
import styles from '@/styles/modules/pages/Home.module.scss';
import HomeEmpty from '@/components/Home/HomeEmpty';
import HomeCard from '@/components/Home/HomeCard';
import { AuthPage } from '@/components/Placeholder/AuthPage';
import NavigationBar from '@/components/Generic/NavigationBar';
import Container from '@/components/Generic/Container';
import { getHomepageData } from '@/utils/pages/homeUtils';
import { getSidebarItems } from '@/utils/components/sidebarUtils';
import { getUserCookie, getProjectCookie } from '@/services/cookies';
import { setToken } from '@/services/axios';
import { getEntities } from '@/services/entities';

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Get the user's cookie based on the request
    const token = getUserCookie(context);
    const userProject = getProjectCookie(context);

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    if (!userProject) {
        return {
            redirect: {
                destination: '/profile',
                permanent: false,
            },
        };
    }

    try {
        setToken(token);
        const data = await getEntities(userProject);
        return { props: { token, data } };
    } catch (error) {
        return { notFound: true };
    }
};

const Home: FunctionComponent<IHomepage> = ({ token, data }) => {
    const { pageProps, breadcrumbs, title, subtitle } = getHomepageData();
    const items = getSidebarItems(data);

    return (
        <AuthPage token={token} pageProps={pageProps} items={items}>
            <main className={styles.home}>
                <NavigationBar breadcrumbs={breadcrumbs} />
                <Container title={title} subtitle={subtitle}>
                    {!items.length ? (
                        <HomeEmpty />
                    ) : (
                        <section className={styles.home__container}>
                            {items.map(({ id, ...rest }) => (
                                <HomeCard key={`${id}-card`} {...rest} />
                            ))}
                        </section>
                    )}
                </Container>
            </main>
        </AuthPage>
    );
};

export default Home;
