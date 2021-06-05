// Out of the box imports
import { FunctionComponent, useContext } from 'react';
import pluralize from 'pluralize';
// Interfaces for the component
import { IEntitiesEmpty } from '@/interfaces/components';
// Custom imports
import styles from '@/styles/modules/pages/Entities.module.scss';
import { EntitiesPageContext } from '@/components/Placeholder/EntitiesPage';
import EmptyEntities from '@/icons/empty-entities.svg';
import { strings } from '@/helpers/pages/entitiesHelper';

const EntitiesEmpty: FunctionComponent<IEntitiesEmpty> = ({ name }) => {
    const { setMode } = useContext(EntitiesPageContext);

    return (
        <section className={styles.empty}>
            <EmptyEntities className={styles.empty__icon} />
            <h3 className={styles.empty__title}>{strings.empty_title(name)}</h3>

            <p className={styles.empty__text}>{strings.empty_text1(name)}</p>
            <p className={styles.empty__text}>{strings.empty_text2(pluralize.plural(name))}</p>

            <button type='button' className={styles.empty__button} onClick={() => setMode('form')}>
                {strings.empty_button(name)}
            </button>
        </section>
    );
};

export default EntitiesEmpty;
