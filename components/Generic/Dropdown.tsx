// Out of the box imports
import { FunctionComponent } from 'react';
// Custom hooks
import { useDropdown } from '@/hooks/useDropdown';
// FontAwesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Interfaces of the component
import { IDropdown } from '@/interfaces/components';
// Custom imports
import styles from '@/styles/modules/components/Dropdown.module.scss';

const Dropdown: FunctionComponent<IDropdown> = ({ options }) => {
    // Update the display of the dropdown from the custom hook
    useDropdown(`.${styles.dropdown}`);

    return (
        <ul className={styles.dropdown}>
            {options.map(({ id, value, icon, callback }) => (
                <li
                    key={`${id}-dropdown-option`}
                    className={styles.dropdown__option}
                    onClick={() => callback && callback()}
                >
                    {icon && <FontAwesomeIcon className={styles.dropdown__icon} icon={icon} />}
                    <span> {value} </span>
                </li>
            ))}
        </ul>
    );
};

export default Dropdown;
