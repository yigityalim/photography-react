import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components'

import Home from '@/pages/Home'
import Contact from '@/pages/Contact'
import Album from '@/pages/Album'
import Cover from '@/pages/Cover'
import Pictures from '@/pages/Pictures'
import NotFound from '@/pages/NotFound'
import ErrorBoundary from '@/pages/ErrorBoundary'


const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <ErrorBoundary />,
        children: [
            {
                index: true,
                path: '/',
                element: <Home />,
            },
            {
                path: '/albums',
                element: <Cover />,
            },
            {
                path: '/album/:id',
                element: <Album />,
            },
            {
                path: '/album/:id/:customer',
                element: <Pictures />,
            },
            {
                path: '/contact',
                element: <Contact />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
])

export default router