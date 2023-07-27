import { cva } from 'class-variance-authority'


export const buttonVariants = cva('active:scale-95 inline-flex items-center justify-center gap-x-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed', {
    variants: {
        variant: {
            primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
            secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
            danger: 'bg-red-600 hover:bg-red-700 text-white',
            success: 'bg-green-600 hover:bg-green-700 text-white',
            warning: 'bg-yellow-600 hover:bg-yellow-700 text-white',
            info: 'bg-blue-600 hover:bg-blue-700 text-white',
            light: 'bg-gray-100 hover:bg-gray-200 text-gray-800',
            dark: 'bg-gray-800 hover:bg-gray-900 text-white',
            link: 'bg-transparent hover:bg-transparent text-indigo-600',
            brand: 'bg-brand text-white',
        },
        size: {
            sm: 'px-3 py-2',
            md: 'px-4 py-2',
            lg: 'px-6 py-3',
            xl: 'px-8 py-4',
        },
        fontSize: {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
            xl: 'text-xl',
            '2xl': 'text-2xl',
            '3xl': 'text-3xl',
            '4xl': 'text-4xl',
            '5xl': 'text-5xl',
            '6xl': 'text-6xl',
            '7xl': 'text-7xl',
        },
        fontWeight: {
            thin: 'font-thin',
            extralight: 'font-extralight',
            light: 'font-light',
            normal: 'font-normal',
            medium: 'font-medium',
            semibold: 'font-semibold',
            bold: 'font-bold',
            extrabold: 'font-extrabold',
            black: 'font-black',
        },
        rounded: {
            none: 'rounded-none',
            sm: 'rounded-sm',
            md: 'rounded-md',
            lg: 'rounded-lg',
            xl: 'rounded-xl',
            '2xl': 'rounded-2xl',
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
        fontSize: 'md',
        fontWeight: 'medium',
        rounded: 'md',
    },
})