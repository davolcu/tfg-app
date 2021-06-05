// Out of the box imports
import { FunctionComponent } from 'react';
import CKEditor from 'ckeditor4-react';
// Interfaces for the component
import { IRichTextarea } from '@/interfaces/components';
// Custom imports
import styles from '@/styles/modules/components/RichTextarea.module.scss';

const RichTextarea: FunctionComponent<IRichTextarea> = ({
    config = { language: 'en' },
    label,
    value,
    style,
    setter,
}) => {
    const textareaChangeHandler = (e: any) => setter && setter(e.editor.getData());

    return (
        <div className={styles.textarea} style={style}>
            {!!label && <label className={styles.textarea__label}>{label}</label>}
            <CKEditor config={config} data={value} onChange={(e: any) => textareaChangeHandler(e)} />
        </div>
    );
};

export default RichTextarea;
