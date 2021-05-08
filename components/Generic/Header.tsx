// Out of the box imports
import { useContext } from 'react';
// FontAwesome imports
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Custom imports
import styles from '@/styles/modules/Header.module.scss';
import { AuthPageContext } from '@/components/Placeholder/AuthPage';

const Header = () => {
    const { user } = useContext(AuthPageContext);
    const picture = user.picture ?? '/icons/no-avatar-header.svg';
    const name = user.name ?? user.nickname ?? user.email ?? '';

    return (
        <header className={styles.header}>
            <img className={styles.header__logo} src='/images/logo.png' alt='Next Logo' />

            <div className={styles.header__dropdown}>
                <img className={styles.header__avatar} src={picture} alt='User Avatar' />
                <span className={styles.header__name}>{name}</span>
                <FontAwesomeIcon className={styles.header__icon} icon={faCaretDown} />
            </div>
        </header>
    );
};

export default Header;
