import React, {HTMLAttributes, ReactNode} from 'react';

type IconProps<
  T extends keyof JSX.IntrinsicElements
    | React.ComponentType<
    Omit<HTMLAttributes<T>, 'as'> & { children?: ReactNode }
  > = 'span'
> = {
  as?: T | keyof JSX.IntrinsicElements;
  children: ReactNode;
  className?: string;
} & Omit<HTMLAttributes<T>, 'as'>;

export function Icon<
  T extends keyof JSX.IntrinsicElements
    | React.ComponentType<Omit<HTMLAttributes<T>, 'as'> & {
    children?: ReactNode
  }
  > = 'span'
>({as: Component = 'span', children, className, ...rest}: IconProps<T>): React.JSX.Element {
  return React.createElement(Component, {
    ...rest,
    className: `material-symbols-outlined ${className ?? ''}`,
    children,
  });
}
