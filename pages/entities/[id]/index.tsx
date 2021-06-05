// Out of the box imports
import { FunctionComponent } from 'react';
import { GetServerSideProps } from 'next';
// Interfaces of the component
import { IEntitiesView } from '@/interfaces/pages';
// Custom imports
import { EntitiesPage } from '@/components/Placeholder/EntitiesPage';
import { getUserCookie } from '@/services/cookies';
import { getEntityInstances } from '@/services/entities';
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

    if (!query?.id) {
        return { notFound: true };
    }

    try {
        setToken(token);
        const data = await getEntityInstances(query.id as string);
        return { props: { token, query, data } };
    } catch (error) {
        return { notFound: true };
    }
};

const EntitiesView: FunctionComponent<IEntitiesView> = ({ token, query, data }) => (
    <EntitiesPage token={token} query={query} data={data} />
);

export default EntitiesView;
