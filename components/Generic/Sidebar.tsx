// Interfaces of the component
import { ISidebarItem } from '@/interfaces/instances';
// Custom imports
import styles from '@/styles/modules/components/Sidebar.module.scss';
import { constants } from '@/helpers/components/sidebarHelper';

// Sidebar first level items
const sideItems: ISidebarItem[] = constants.SIDEBAR_ITEMS;

const Sidebar = () => {
    const navItems: any[] = [];

    return (
        <aside className={styles.sidebar}>
            <ul className={styles.sidebar__items}>
                {sideItems.map(({ id, image }) => (
                    <li key={`${id}-item`} className={styles.sidebar__item}>
                        <img src={image} alt={`${id} Menu Image`} />
                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
