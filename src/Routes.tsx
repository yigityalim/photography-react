import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components'
import { AdminLayout } from '@/pages/Admin/components'

import Home from '@/pages/Home'
import Portfolio from '@/pages/Portfolio'
import Images from '@/pages/Images'
import Admin from '@/pages/Admin'
import { Login } from '@/pages/Login'


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
                path: '/portfolio',
                element: <Portfolio />,
            },
            {
                path: '/images',
                element: <Images />,
            },
        ],
    },
    {
        element: <AdminLayout />,
        children: [
            {
                index: true,
                path: '/admin',
                element: <Admin />,
            },
            {
                path: '/admin/login',
                element: <Login />,
            },
            /*
            {
                path: '/admin/register',
                element: <Register />,
            }
             */
        ],
    },
])

export default router