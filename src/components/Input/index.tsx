import React, { ChangeEvent, HTMLInputTypeAttribute, useState } from 'react'
import { v4 } from 'uuid'
import { cn } from '@/utils'
import { useMediaQuery } from 'usehooks-ts'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
    className?: string;
    text?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    setter?: React.Dispatch<React.SetStateAction<string>>;
};

export function Input(
    {
        type = 'text',
        placeholder,
        className,
        text,
        onChange,
        ...props
    }: InputProps,
): React.ReactElement {
    const id: string = v4()
    const isTablet: boolean = useMediaQuery('(min-width: 768px)')
    const [isFocused, setIsFocused] = useState(false)

    const handleFocus = () => {
        setIsFocused(true)
    }

    const handleBlur = () => {
        setIsFocused(text !== '') // Eğer içerik varsa, etiket odak dışı kaldığında aşağıda kalacak
    }

    console.log('isFocused', isFocused)

    return (
        <div className={cn('relative w-full', className)}>
            <input
                id={id}
                type={type}
                value={text}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className={cn(
                    'w-full h-full placeholder:text-primary font-bold focus:outline-none peer placeholder-transparent resize-none',
                    {
                        'border-b-2 bg-transparent border-t-transparent border-x-transparent py-4': !isTablet && !isFocused,
                    },
                    {
                        ' border-2 border-t-primary dark:border-t-gray border-x-primary dark:border-x-gray rounded bg-gray dark:bg-primary p-4': isTablet || isFocused,
                    },
                )}
                {...props}
            />
            {placeholder && (
                <label
                    htmlFor={id}
                    className={cn(
                        'absolute top-1/2 -translate-y-1/2 translate-x-2 left-0 py-2 px-4 pb-1 text-primary dark:text-white font-bold transition-all duration-300 peer-focus:text-xs peer-focus:top-0 peer-focus:-translate-y-5 peer-focus:bg-gray dark:peer-focus:bg-primary rounded',
                        {
                            'text-xs translate-x-0': !isFocused && text !== '',
                        },
                        {
                            'text-sm translate-x-2': isFocused || text !== '',
                        },
                    )}
                >
                    {placeholder}
                </label>
            )}
        </div>
    )
}
