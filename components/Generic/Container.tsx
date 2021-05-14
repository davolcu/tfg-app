// Out of the box imports
import { FunctionComponent } from 'react';
// Interfaces of the component
import { IContainer } from '@/interfaces/components';
// Custom imports
import styles from '@/styles/modules/components/Container.module.scss';

const Container: FunctionComponent<IContainer> = ({ title, subtitle, children }) => {
    return (
        <section className={styles.container}>
            {(title || subtitle) && (
                <div className={styles.container__header}>
                    {title && <h2 className={styles.container__title}> {title} </h2>}
                    {subtitle && <p className={styles.container__subtitle}> {subtitle} </p>}
                </div>
            )}

            <div className={styles.container__body}>{children}</div>
        </section>
    );
};

export default Container;
