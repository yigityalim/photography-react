import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components'

import Home from '@/pages/Home'
import Contact from '@/pages/Contact'
import Image from '@/pages/Image'
import Albums from '@/pages/Albums'


const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                index: true,
                path: '/',
                element: <Home />,
            },
            {
                path: '/albums',
                element: <Albums />,
            },
            {
                path: '/image/:id',
                element: <Image />,
            },
            {
                path: '/contact',
                element: <Contact />,
            },
        ],
    }
])

export default router