// Out of the box imports
import { FunctionComponent, Fragment } from 'react';
// Interfaces of the component
import { INavigationBar } from '@/interfaces/components';
// Custom imports
import styles from '@/styles/modules/components/NavigationBar.module.scss';

const NavigationBar: FunctionComponent<INavigationBar> = ({ breadcrumbs }) => {
    return (
        <section className={styles.navigation}>
            {breadcrumbs.map(({ id, value, link, image }, index) => (
                <Fragment key={`${id}-nav-fragment`}>
                    {!!index && (
                        <span key={`${id}-nav-arrow`} className={styles.navigation__arrow}>
                            ›
                        </span>
                    )}
                    {link ? (
                        <a key={`${id}-nav-link`} href={link} className={styles.navigation__link}>
                            {image && (
                                <img
                                    key={`${id}-nav-image`}
                                    src={image}
                                    alt={`${value} Image`}
                                    className={styles.navigation__image}
                                    onError={(e) => console.log(e)}
                                />
                            )}
                            {value}
                        </a>
                    ) : (
                        <div key={`${id}-nav-text`} className={styles.navigation__text}>
                            {image && (
                                <img
                                    key={`${id}-nav-image`}
                                    src={image}
                                    alt={`${value} Image`}
                                    className={styles.navigation__image}
                                />
                            )}
                            {value}
                        </div>
                    )}
                </Fragment>
            ))}
        </section>
    );
};

export default NavigationBar;
