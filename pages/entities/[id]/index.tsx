// Out of the box imports
import { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
// Interfaces of the component
import { IEntitiesView } from '@/interfaces/pages';
// Custom imports
import { getSidebarItems } from '@/utils/components/sidebarUtils';
import { EntitiesPage } from '@/components/Placeholder/EntitiesPage';
import { getUserCookie, getProjectCookie } from '@/services/cookies';
import { getEntityInstances, getEntities } from '@/services/entities';
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

    if (!query?.id) {
        return { notFound: true };
    }

    try {
        setToken(token);
        const entities = await getEntities(userProject);
        const data = await getEntityInstances(query.id as string, userProject);
        return { props: { token, query, data, entities } };
    } catch (error) {
        return { notFound: true };
    }
};

const EntitiesView: FunctionComponent<IEntitiesView> = ({ token, query, data, entities }) => {
    const items = getSidebarItems(entities);
    return <EntitiesPage token={token} query={query} data={data} items={items} />;
};

export default EntitiesView;
