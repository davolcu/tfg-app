// Out of the box imports
import { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
// Interfaces of the component
import { IEntityView } from '@/interfaces/pages';
// Custom imports
import styles from '@/styles/modules/pages/Entity.module.scss';
import { getSidebarItems } from '@/utils/components/sidebarUtils';
import { AuthPage } from '@/components/Placeholder/AuthPage';
import NavigationBar from '@/components/Generic/NavigationBar';
import Container from '@/components/Generic/Container';
import EntityForm from '@/components/Entity/EntityForm';
import { getEntityPageData } from '@/utils/pages/entityUtils';
import { getUserCookie, getProjectCookie } from '@/services/cookies';
import { getEntities, getEntityInstance } from '@/services/entities';
import { setToken } from '@/services/axios';

export const getServerSideProps: GetServerSideProps = async (context) => {
    // Get the user's cookie based on the request
    const token = getUserCookie(context);
    const userProject = getProjectCookie(context);
    const { query } = context;

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

    if (!query?.id || !query?.slug) {
        return { notFound: true };
    }

    try {
        setToken(token);
        const entities = await getEntities(userProject);
        const data = await getEntityInstance(query.id as string, query.slug as string);
        return { props: { token, data, entities } };
    } catch (error) {
        return { notFound: true };
    }
};

const EntityView: FunctionComponent<IEntityView> = ({ token, data, entities }) => {
    const { pageProps, breadcrumbs, title } = getEntityPageData(data);
    const items = getSidebarItems(entities);

    return (
        <AuthPage token={token} pageProps={pageProps} items={items}>
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
