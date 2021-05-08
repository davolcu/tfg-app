// Custom imports
import styles from '@/styles/modules/Sidebar.module.scss';

const Sidebar = () => {
    const navItems: any[] = [];
    return (
        <aside className={styles.sidebar}>
            <ul>
                {navItems.map((item) => (
                    <li key={item.id}> {item.name} </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
