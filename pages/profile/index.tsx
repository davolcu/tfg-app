// Out of the box imports
import { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
// Interfaces of the component
import { IProfile } from '@/interfaces/pages';
// Custom imports
import styles from '@/styles/modules/pages/Profile.module.scss';
import NavigationBar from '@/components/Generic/NavigationBar';
import Container from '@/components/Generic/Container';
import { AuthPage } from '@/components/Placeholder/AuthPage';
import ProfileUserForm from '@/components/Profile/ProfileUserForm';
import { getUserCookie, getProjectCookie } from '@/services/cookies';
import { getEntities } from '@/services/entities';
import { setToken } from '@/services/axios';
import { getProfilePageData } from '@/utils/pages/profileUtils';
import { getSidebarItems } from '@/utils/components/sidebarUtils';

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

    try {
        const props = { token };

        if (userProject) {
            setToken(token);
            const data = await getEntities(userProject);
            Object.assign(props, { data });
        }

        return { props };
    } catch (error) {
        return { notFound: true };
    }
};

const Home: FunctionComponent<IProfile> = ({ token, data }) => {
    const { pageProps, breadcrumbs, title, subtitle } = getProfilePageData();
    const items = getSidebarItems(data);

    return (
        <AuthPage token={token} pageProps={pageProps} items={items}>
            <main className={styles.profile}>
                <NavigationBar breadcrumbs={breadcrumbs} />
                <Container title={title} subtitle={subtitle}>
                    <ProfileUserForm />
                </Container>
            </main>
        </AuthPage>
    );
};

export default Home;
