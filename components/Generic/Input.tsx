// Out of the box imports
import { FunctionComponent } from 'react';
// Interfaces for the component
import { IInput } from '@/interfaces/components';
// Custom imports
import styles from '@/styles/modules/components/Input.module.scss';

const Input: FunctionComponent<IInput> = ({
    name,
    type = 'text',
    step,
    min,
    max,
    value = '',
    label,
    placeholder = '',
    id,
    style,
    setter,
}) => {
    // Handler to emit the value to the upper component
    const inputChangeHandler = (target: HTMLInputElement) => setter(target.value);

    return (
        <div className={styles.input} style={style}>
            {!!label && (
                <label htmlFor={name} className={styles.input__label}>
                    {label}
                </label>
            )}
            <input
                type={type}
                value={value}
                className={styles.input__element}
                placeholder={placeholder}
                name={name}
                step={step}
                min={min}
                max={max}
                id={id}
                onChange={(e) => inputChangeHandler(e.target)}
            />
        </div>
    );
};

export default Input;
