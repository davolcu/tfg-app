// Out of the box imports
import { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
// Interfaces of the component
import { IEntityView } from '@/interfaces/pages';
// Custom imports
import styles from '@/styles/modules/pages/Entity.module.scss';
import { AuthPage } from '@/components/Placeholder/AuthPage';
import NavigationBar from '@/components/Generic/NavigationBar';
import Container from '@/components/Generic/Container';
import EntityForm from '@/components/Entity/EntityForm';
import { getEntityPageData } from '@/utils/pages/entityUtils';
import { getUserCookie } from '@/services/cookies';
import { getEntityInstance } from '@/services/entities';
import { setToken } from '@/services/axios';

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Get the user's cookie based on the request
    const token = getUserCookie(context);
    const { query } = context;

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    if (!query?.id || !query?.slug) {
        return { notFound: true };
    }

    try {
        setToken(token);
        const data = await getEntityInstance(query.id as string, query.slug as string);
        return { props: { token, data } };
    } catch (error) {
        return { notFound: true };
    }
};

const EntityView: FunctionComponent<IEntityView> = ({ token, data }) => {
    const { pageProps, breadcrumbs, title } = getEntityPageData(data);

    return (
        <AuthPage token={token} pageProps={pageProps}>
            <main className={styles.entity}>
                <NavigationBar breadcrumbs={breadcrumbs} />
                <Container title={title}>
                    <EntityForm data={data} />
                </Container>
            </main>
        </AuthPage>
    );
};

export default EntityView;
