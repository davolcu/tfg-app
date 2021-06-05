// Out of the box imports
import { FunctionComponent } from 'react';
// FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// Interfaces of the component
import { ILoader } from '@/interfaces/components';
// Custom imports
import styles from '@/styles/modules/components/Loader.module.scss';

const Loader: FunctionComponent<ILoader> = ({ size }) => {
    const sizingClass = size ? `loader__icon--${size}` : 'loader__icon';

    return (
        <section className={styles.loader}>
            <FontAwesomeIcon icon={faSpinner} className={styles[sizingClass]} />
        </section>
    );
};

export default Loader;
