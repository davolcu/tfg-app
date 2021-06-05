// Out of the box imports
import { FunctionComponent, useContext } from 'react';
// FontAwesome imports
import { faEye, faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Interfaces of the component
import { IEntitiesList } from '@/interfaces/components';
// Custom imports
import styles from '@/styles/modules/pages/Entities.module.scss';
import EntitiesCount from '@/components/Entities/EntitiesCount';
import EntitiesEmpty from '@/components/Entities/EntitiesEmpty';
import { EntitiesPageContext } from '@/components/Placeholder/EntitiesPage';
import { deleteEntityInstance } from '@/services/entities';
import { createToast } from '@/utils/utils';
import { strings } from '@/helpers/pages/entitiesHelper';

const EntitiesList: FunctionComponent<IEntitiesList> = ({ data }) => {
    const { entities, setEntities, setMode, setActiveEntity } = useContext(EntitiesPageContext);
    const { name, id } = data.Metadata;

    // Handler to edit the given entity by its slug
    const editEntityHandler = (slug: string) => {
        // Set the slug onto the url
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('slug', slug);
        window.history.replaceState({}, '', `${location.pathname}?${searchParams}`);
        // Trigger the change to the edit mode
        setActiveEntity();
    };

    // Handler to delete the given entity by its slug
    const deleteEntityHandler = (slug: string) => {
        deleteEntityInstance(id, slug)
            .then(({ status }) => {
                if (status === 200) {
                    setEntities([...entities.filter((entity) => entity.id !== slug)]);
                    createToast({ text: strings.entity_deleted_successfully, type: 'success', duration: 3500 });
                }
            })
            .catch((error) => {
                console.error(error);
                createToast({ text: error.message, type: 'error', duration: 3500 });
            });
    };

    return (
        <>
            <button type='button' className={styles.list__button} onClick={() => setMode('form')}>
                {strings.empty_button(name)}
            </button>

            <EntitiesCount count={entities.length} name={name} />
            {!entities.length ? (
                <EntitiesEmpty name={name} />
            ) : (
                <ul className={styles.list__container}>
                    {entities.map(({ id: slug, name }) => (
                        <li key={slug} className={styles.list__item}>
                            <a href={`/entities/${id}/${slug}`} className={styles.list__link}>
                                {name}
                            </a>

                            <div className={styles.list__icons}>
                                <a href={`/entities/${id}/${slug}`} className={styles['list__icon-container']}>
                                    <FontAwesomeIcon icon={faEye} className={styles.list__icon} />
                                    View
                                </a>
                                <span
                                    className={styles['list__icon-container']}
                                    onClick={() => editEntityHandler(slug as string)}
                                >
                                    <FontAwesomeIcon icon={faPen} className={styles.list__icon} />
                                    Edit
                                </span>
                                <span
                                    className={styles['list__icon-container']}
                                    onClick={() => deleteEntityHandler(slug as string)}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} className={styles.list__icon} />
                                    Delete
                                </span>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default EntitiesList;
