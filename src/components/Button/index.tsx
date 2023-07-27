import React, { ButtonHTMLAttributes, forwardRef } from 'react'
import { VariantProps } from 'class-variance-authority'
import { cn } from '@/utils'
import { buttonVariants } from './Button.variants'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
}

export const Button: React.FC<ButtonProps> = forwardRef<HTMLButtonElement, ButtonProps>((
        {
            children,
            className,
            variant,
            size,
            fontSize,
            fontWeight,
            rounded,
            ...props
        },
        ref: React.ForwardedRef<HTMLButtonElement>) => {
        return (
            <button
                ref={ref}
                className={cn(
                    buttonVariants({ variant, size, fontSize, fontWeight, rounded, className }),
                )}
                {...props}
            >{children}</button>
        )
    },
)