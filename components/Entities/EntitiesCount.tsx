// Out of the box imports
import { FunctionComponent } from 'react';
import pluralize from 'pluralize';
// Interfaces for the component
import { IEntitiesCount } from '@/interfaces/components';
// Custom imports
import styles from '@/styles/modules/pages/Entities.module.scss';
import { strings } from '@/helpers/pages/entitiesHelper';

const EntitiesCount: FunctionComponent<IEntitiesCount> = ({ count, name }) => {
    const pluralName = pluralize.plural(name);
    return <div className={styles.entities__count}>{strings.entities_count(count, pluralName)}</div>;
};

export default EntitiesCount;
