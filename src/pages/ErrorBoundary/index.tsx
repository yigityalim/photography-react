import { useRouteError } from 'react-router-dom'

const ErrorBoundary = () => {
    const error = useRouteError() as {
        message: string;
    }

    return (
        <section
            className='flex flex-col gap-y-4 items-center justify-center w-full h-full'
        >
            <h1 className='text-2xl font-bold text-red-400'>Error Boundary</h1>
            <p className='text-xl font-normal'>{error?.message}</p>
        </section>
    )
}

export default ErrorBoundary