import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string
    error?: string
    register: never
    name: string
    type?: string
}

export function Input(props: InputProps): React.JSX.Element {
    return (
        <div className='flex flex-col gap-y-2'>
            <label htmlFor={props.name} className='text-gray-600 font-semibold'>
                {props.label}
            </label>
            <input
                {...props}
                className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-300'
            />
            {props.error && <p className='text-red-500 text-sm'>{props.error}</p>}
        </div>
    )
}
