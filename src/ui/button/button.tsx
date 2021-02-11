import clsx from 'clsx';
import * as React from 'react';
import { ForwardedRef } from 'react';

import styles from './button.scss';

type ButtonState = 'active' | 'disabled' | 'large' | 'rounded' | 'outline' | 'fluid';
type PropsIn<I extends string, T> = {
    [state in I]?: T;
}
type ButtonProps = JSX.IntrinsicElements['button'] & PropsIn<ButtonState, boolean>;

export const Button: React.FC<ButtonProps> = React.forwardRef((
    {
        large,
        rounded,
        fluid,
        className,
        ...props
    },
    ref: ForwardedRef<HTMLButtonElement>
) => {
    const buttonClassName = clsx(
        className,
        styles.button,
        props.disabled && styles.button_disabled,
        large && styles.button_large,
        rounded && styles.button_rounded,
        fluid && styles.button_fluid
    )

    return (
        <button
            ref={ref}
            className={buttonClassName}
            {...props}
        />
    )
})
