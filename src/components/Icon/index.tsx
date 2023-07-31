import React, { HTMLAttributes, ReactNode } from 'react'

type IconProps<
    T extends keyof React.JSX.IntrinsicElements
        | React.ComponentType<
        Omit<HTMLAttributes<T>, 'as'> & { children?: ReactNode }
    > = 'span'
> = {
    as?: T | keyof React.JSX.IntrinsicElements;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
} & Omit<HTMLAttributes<T>, 'as'>;

export function Icon<
    T extends keyof React.JSX.IntrinsicElements
        | React.ComponentType<Omit<HTMLAttributes<T>, 'as'> & {
        children?: ReactNode
    }
    > = 'span'
>({ as: Component = 'span', children, className, ...rest }: IconProps<T>): React.JSX.Element {
    return React.createElement(Component, {
        ...rest,
        className: `material-symbols-outlined ${className ?? ''}`,
        children,
    })
}
