// Interfaces of the view
import { IToast, IToggler, IFader } from '@/interfaces/utils';

/**
 * Arrow function to toggle elements without jQuery
 * @param {Object} element: Element to be toggled
 * @param {String} display: Which type of display has the element when showing up | default => block
 * @param {Number} timer: Fading animation timeout | default => 300ms
 */
export const toggleElement = ({ element, display = 'block', timer = 300 }: IToggler) => {
    if (!element) return;

    // If the current display matches the target display, do nothing
    const currentDisplay = window.getComputedStyle(element).display;
    if (currentDisplay === display) return;

    const isHidden = currentDisplay === 'none';

    // First add the opacity transition and set the default opacity for hidden elements
    element.style.opacity = isHidden ? '0' : '1';
    element.style.transition = `opacity ${timer}ms linear`;

    // Then do the toggling depending on the actual display
    setTimeout(
        () => {
            element.style[isHidden ? 'opacity' : 'display'] = isHidden ? '1' : 'none';
        },
        isHidden ? 100 : timer,
    );

    element.style[isHidden ? 'display' : 'opacity'] = isHidden ? display : '0';
};

/**
 * Arrow function to toggle out by selector
 * @param {String} selector: Valid element selector
 * @param {Number} timer: Fading animation timeout | default => 300ms
 */
export const fadeOutBySelector = ({ selector, timer = 300 }: IFader) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        toggleElement({ element, display: 'none', timer });
    });
};

/**
 * Arrow function to toggle in by selector
 * @param {String} selector: Valid element selector
 * @param {String} display: Which type of display has the element when showing up | default => block
 * @param {Number} timer: Fading animation timeout | default => 300ms
 */
export const fadeInBySelector = ({ selector, display = 'block', timer = 300 }: IFader) => {
    document.querySelectorAll<HTMLElement>(selector).forEach((element) => {
        toggleElement({ element, display, timer });
    });
};

/**
 * Method to create and/or show a toast where needed
 * @param {String} text: Text for toast
 * @param {String} type: Type of the toast, it will determine its main color. Currently supporting success, error or warning
 * @param {String} extraClasses: Extra classes needed for the toast
 * @param {Number} duration: Fading animation timeout | default => 2500ms
 */
export const createToast = ({ text, type, extraClasses = [], duration = 2500 }: IToast) => {
    const toastClass = 'toast';

    if (!document.querySelector(`.${toastClass}`)) {
        const toast = document.createElement('div');
        toast.classList.add(...[toastClass, ...extraClasses]);
        toast.innerHTML = '<span></span>';
        document.querySelector('body')?.appendChild(toast);
    }

    // If the element has not been inserted then return
    const toastElement = document.querySelector(`.${toastClass}`);
    if (!toastElement) {
        return;
    }

    if (type) {
        toastElement.classList.remove(`${toastClass}--success`, `${toastClass}--error`, `${toastClass}--warning`);
        toastElement.classList.add(`${toastClass}--${type}`);
    }

    // Null-check its span child before using it
    const childElement = toastElement.querySelector(`span`);
    if (childElement) {
        childElement.innerText = text;
    }

    // Fade in the toast
    fadeInBySelector({ selector: `.${toastClass}` });

    // Defer its fade out
    setTimeout(() => {
        fadeOutBySelector({ selector: `.${toastClass}` });
    }, duration);
};
