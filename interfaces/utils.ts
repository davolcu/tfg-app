// Interface for the toast cration method
export interface iToast {
    text: string;
    type?: 'success' | 'warning' | 'error';
    extraClasses?: string[];
    duration?: number;
}

// Interface for the toggler method
export interface iToggler {
    element: HTMLElement;
    display?: string;
    timer?: number;
}

// Interface for the fader methods
export interface iFader {
    selector: string;
    display?: string;
    timer?: number;
}
