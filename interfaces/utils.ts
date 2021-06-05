// Interface for the toast cration method
export interface IToast {
    text: string;
    type?: 'success' | 'warning' | 'error';
    extraClasses?: string[];
    duration?: number;
}

// Interface for the toggler method
export interface IToggler {
    element: HTMLElement;
    display?: string;
    timer?: number;
}

// Interface for the fader methods
export interface IFader {
    selector: string;
    display?: string;
    timer?: number;
}
