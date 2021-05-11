// FontAwesome imports
import { faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
// Callbacks for the options
import { signOut } from '@/services/login';

export const constants = {
    DROPDOWN_OPTIONS: [
        {
            id: 'settings',
            value: 'Settings',
            icon: faCog,
            callback: () => (location.href = '/profile'),
        },
        {
            id: 'logout',
            value: 'Log Out',
            icon: faSignOutAlt,
            callback: signOut,
        },
    ],
};
