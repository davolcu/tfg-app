// Out of the box imports
import { useContext } from 'react';
// FontAwesome imports
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom imports
import styles from '@/styles/modules/Header.module.scss';
import { AuthPageContext } from '@/components/Placeholder/AuthPage';
import Dropdown from '@/components/Generic/Dropdown';
import { constants } from '@/helpers/components/headerHelper';

// Dropdown options & mapping for the header
const { DROPDOWN_OPTIONS: options } = constants;

const Header = () => {
    const { user, loaded } = useContext(AuthPageContext);
    const { picture = '/icons/no-avatar-header.svg' } = user;
    const name = user.name ?? user.nickname ?? user.email ?? '';

    return (
        <header className={styles.header}>
            <img className={styles.header__logo} src='/images/logo.png' alt='Next Logo' />

            {loaded && (
                <div className={`${styles.header__dropdown + ' ' + styles.header__dropdown}`}>
                    <div className={styles.header__user}>
                        <img className={styles.header__avatar} src={picture} alt='User Avatar' />
                        <span className={styles.header__name}>{name}</span>
                        <FontAwesomeIcon className={styles.header__icon} icon={faCaretDown} />
                    </div>

                    <Dropdown options={options} />
                </div>
            )}
        </header>
    );
};

export default Header;
