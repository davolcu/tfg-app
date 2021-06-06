// Custom imports
import styles from '@/styles/modules/pages/Home.module.scss';
import { strings } from '@/helpers/pages/homeHelper';

const EntitiesEmpty = () => {
    return (
        <section className={styles.empty}>
            <h3 className={styles.empty__title}>{strings.empty_title}</h3>

            <p className={styles.empty__text}>{strings.empty_text1}</p>
            <p className={styles.empty__text}>{strings.empty_text2}</p>

            <a href='/profile' className={styles.empty__button}>
                {strings.empty_button}
            </a>
        </section>
    );
};

export default EntitiesEmpty;
