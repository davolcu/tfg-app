// Out of the box imports
import { createContext, FunctionComponent, useState } from 'react';
// Interfaces of the component
import { IEntitiesPage } from '@/interfaces/components';
import { IEntitiesPageContext } from '@/interfaces/contexts';
// Custom imports
import styles from '@/styles/modules/pages/Entities.module.scss';
import { AuthPage } from '@/components/Placeholder/AuthPage';
import NavigationBar from '@/components/Generic/NavigationBar';
import Container from '@/components/Generic/Container';
import EntitiesForm from '@/components/Entities/EntitiesForm';
import EntitiesList from '@/components/Entities/EntitiesList';
import { isListMode, getEntitiesPageData, getActiveEntity } from '@/utils/pages/entitiesUtils';

// Create the context for the auth pages
const contextDefaultValue: IEntitiesPageContext = {
    mode: '',
    setMode: () => '',
    entities: [],
    setEntities: () => [],
    activeEntity: {},
    setActiveEntity: () => ({}),
};
const EntitiesPageContext = createContext<IEntitiesPageContext>(contextDefaultValue);

const EntitiesPage: FunctionComponent<IEntitiesPage> = ({ token, query, data }) => {
    const [entities, setEntities] = useState(data.Items);
    const [activeEntity, setActiveEntity] = useState(getActiveEntity(query, entities));
    const [mode, setMode] = useState(!!activeEntity ? 'form' : 'list');
    const { pageProps, breadcrumbs, title, subtitle } = getEntitiesPageData(data, mode, activeEntity);

    // Handler to read the entity from the params and start the edit mode
    const setActiveEntityHandler = () => {
        // Read the slug from the url
        const searchParams = new URLSearchParams(location.search);

        // If there is no slug, clear the url and the active entity
        if (!searchParams.has('slug')) {
            if (!!activeEntity) {
                setActiveEntity(undefined);
            }

            return;
        }

        // Persist the active entity from the slug if exists
        const slug = searchParams.get('slug');
        const entity = entities.find(({ id }) => id === slug);

        if (!entity) {
            window.history.replaceState({}, '', location.pathname);
            return;
        }

        setActiveEntity({ ...entity });
        setMode('form');
    };

    return (
        <EntitiesPageContext.Provider
            value={{ mode, setMode, entities, setEntities, activeEntity, setActiveEntity: setActiveEntityHandler }}
        >
            <AuthPage token={token} pageProps={pageProps}>
                <main className={styles.entities}>
                    <NavigationBar breadcrumbs={breadcrumbs} />
                    <Container title={title} subtitle={subtitle}>
                        {isListMode(mode) ? <EntitiesList data={data} /> : <EntitiesForm data={data} />}
                    </Container>
                </main>
            </AuthPage>
        </EntitiesPageContext.Provider>
    );
};

export { EntitiesPage, EntitiesPageContext };
