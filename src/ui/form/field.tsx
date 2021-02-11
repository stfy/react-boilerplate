import * as React from 'react';
import styles from './field.scss'


export type FormFieldProps = {
    label?: string
    renderInput: (props: never) => React.ReactNode
}

export const Field: React.FC<FormFieldProps> = ({label, renderInput}) => {
    return (
        <div className={styles.field}>
            {label && <label className={styles.field__label}>{label}</label>}
            {renderInput(null as never)}
        </div>
    )
}
