// Out of the box imports
import { FunctionComponent, useState, useContext } from 'react';
// Interfaces of the component
import { IEntitiesForm } from '@/interfaces/components';
// Custom imports
import styles from '@/styles/modules/pages/Entities.module.scss';
import { EntitiesPageContext } from '@/components/Placeholder/EntitiesPage';
import { getInitialFormData, getFormAttributes, isFormValid } from '@/utils/pages/entitiesUtils';
import { createToast } from '@/utils/utils';
import { createEntityInstance, editEntityInstance } from '@/services/entities';

const EntitiesForm: FunctionComponent<IEntitiesForm> = ({ data }) => {
    const { setMode, setActiveEntity, activeEntity } = useContext(EntitiesPageContext);
    const [formData, setFormData] = useState(getInitialFormData(data, activeEntity));
    const [loaded, setLoaded] = useState(true);
    // Handler to update the form and get the form attribute components
    const formUpdateHandler = (key: string, value: string) => setFormData({ ...formData, [key]: value });
    const formAttributes = getFormAttributes(data, formUpdateHandler);
    const isDisabledButton = isFormValid(formData, data, loaded);
    const { id } = data.Metadata;

    // Handler to cancel the creation/edition of an entity
    const formCancelHandler = () => {
        window.history.replaceState({}, '', location.pathname);
        setActiveEntity();
        setMode('list');
    };

    // Handler to submit the creation/edition form
    const formSubmitHandler = () => {
        if (!loaded) {
            return;
        }
        setLoaded(false);

        if (!!activeEntity) {
            editEntityInstance(id, activeEntity.id as string, formData)
                .then(({ status }) => {
                    if (status === 200) {
                        location.href = `/entities/${id}`;
                    }
                })
                .catch((error) => {
                    console.error(error);
                    createToast({ text: error.message, type: 'error', duration: 3500 });
                    setLoaded(true);
                });
            return;
        }

        createEntityInstance(id, formData)
            .then(({ status }) => {
                if (status === 200) {
                    location.href = `/entities/${id}`;
                }
            })
            .catch((error) => {
                console.error(error);
                createToast({ text: error.message, type: 'error', duration: 3500 });
                setLoaded(true);
            });
    };

    return (
        <section className={styles.entities__container}>
            {formAttributes.map(({ Component, props, name }) => (
                <Component {...props} value={formData[name]} />
            ))}

            <div className={styles.entities__buttons}>
                <button
                    type='button'
                    onClick={() => formCancelHandler()}
                    className={`${styles.entities__button} ${styles['entities__button--cancel']}`}
                >
                    Cancel
                </button>

                <button
                    type='button'
                    onClick={() => formSubmitHandler()}
                    disabled={isDisabledButton}
                    className={`${styles.entities__button} ${styles['entities__button--confirm']}`}
                >
                    {!!activeEntity ? 'Update' : 'Create'}
                </button>
            </div>
        </section>
    );
};

export default EntitiesForm;
