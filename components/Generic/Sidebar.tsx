// Out of the box imports
import { FunctionComponent } from 'react';
// Interfaces of the component
import { ISidebar } from '@/interfaces/components';
// Custom imports
import styles from '@/styles/modules/components/Sidebar.module.scss';

const Sidebar: FunctionComponent<ISidebar> = ({ items }) => {
    const navItems: any[] = [];

    return (
        <aside className={styles.sidebar}>
            <ul className={styles.sidebar__items}>
                {items.map(({ id, value, link }) => (
                    <li key={`${id}-item`} className={styles.sidebar__item}>
                        <a href={link} className={styles.sidebar__link}>
                            {value}
                        </a>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
