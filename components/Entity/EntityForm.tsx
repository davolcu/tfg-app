// Out of the box imports
import { FunctionComponent, useState } from 'react';
// Interfaces of the component
import { IEntityForm } from '@/interfaces/components';
// Custom imports
import styles from '@/styles/modules/pages/Entity.module.scss';
import { getFormData } from '@/utils/pages/entityUtils';

const EntityForm: FunctionComponent<IEntityForm> = ({ data }) => {
    const formData = getFormData(data);

    return (
        <section className={styles.entity__container}>
            {formData.map(({ Component, props }) => (
                <Component {...props} />
            ))}
        </section>
    );
};

export default EntityForm;
