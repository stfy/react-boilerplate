import clsx from 'clsx';
import * as React from 'react';
import styles from './input.scss';

export type InputProps = JSX.IntrinsicElements['input'];

export const Input: React.FC<InputProps> = React.forwardRef(({className, ...props}, ref) => {
    const inputClassName = clsx(
        className,
        styles.input
    )

    return <input
        className={inputClassName}
        ref={ref}
        {...props}
    />
})
