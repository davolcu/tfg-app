// Out of the box imports
import { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
// Interfaces of the component
import { IEntityList } from '@/interfaces/pages';
// Custom imports
import styles from '@/styles/modules/pages/Profile.module.scss';
import NavigationBar from '@/components/Generic/NavigationBar';
import Container from '@/components/Generic/Container';
import { AuthPage } from '@/components/Placeholder/AuthPage';
import ProfileUserForm from '@/components/Profile/ProfileUserForm';
import { getUserCookie } from '@/services/cookies';
import { constants } from '@/helpers/pages/profileHelper';

// Get the static needed data from the constants
const { PROFILE_PROPS: pageProps, PROFILE_BREADCRUMBS: breadcrumbs, PROFILE_CONTAINER: container } = constants;

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Get the user's cookie based on the request
    const token = getUserCookie(context);
    const { params } = context;

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: { token, params },
    };
};

const EntityList: FunctionComponent<IEntityList> = ({ token, params }) => {
    console.log(params);
    return (
        <AuthPage token={token} pageProps={pageProps}>
            <main className={styles.profile}>
                <NavigationBar breadcrumbs={breadcrumbs} />
                <Container title={container.title} subtitle={container.subtitle}>
                    <ProfileUserForm />
                </Container>
            </main>
        </AuthPage>
    );
};

export default EntityList;
