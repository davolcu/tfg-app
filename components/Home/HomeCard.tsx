// Out of the box imports
import { FunctionComponent } from 'react';
// Interfaces for the component
import { IHomeCard } from '@/interfaces/components';
// Custom imports
import styles from '@/styles/modules/pages/Home.module.scss';

const HomeCard: FunctionComponent<IHomeCard> = ({ value, description, link }) => {
    return (
        <a href={link} className={styles.home__card}>
            <h3 className={styles.home__title}> {value} </h3>
            <p className={styles.home__description}> {description} </p>
        </a>
    );
};

export default HomeCard;
