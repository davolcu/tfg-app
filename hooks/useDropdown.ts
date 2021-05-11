// Out of the box imports
import { useEffect, useState } from 'react';
// Custom imports
import { fadeInBySelector, fadeOutBySelector } from '@/utils/utils';

export const useDropdown = (selector: string) => {
    const [parent, setParent] = useState('');

    // Function to show the dropdown by clicking its parent selector, unless it's already shown, then if the event triggers it will hide the dropdown
    const showDropdown = () => {
        const element = document.querySelector(selector);

        if (element) {
            const { display } = window.getComputedStyle(element);

            if (display !== 'none') {
                fadeOutBySelector({ selector, timer: 150 });
                document.removeEventListener('click', hideDropdown);
                return;
            }
        }

        // Toggle in the options
        fadeInBySelector({ selector, display: 'flex', timer: 150 });
        document.addEventListener('click', hideDropdown);
    };

    // Function to hide the selector once the user clicks on any element of the website
    const hideDropdown = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.matches(parent) || target.matches(`${parent} *`)) {
            return;
        }

        // Toggle out the options
        fadeOutBySelector({ selector, timer: 150 });
        document.removeEventListener('click', hideDropdown);
    };

    // Sets the parent element selector once is rendered
    useEffect(() => {
        if (parent) {
            document.querySelector(parent)?.addEventListener('click', showDropdown);
            return;
        }

        const element = document.querySelector(selector);
        if (!element || !element.parentElement) {
            return;
        }

        setParent(`.${element.parentElement.className.replaceAll(' ', '.')}`);
    }, [parent]);
};
