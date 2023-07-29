import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/components'
import { AdminLayout } from '@/pages/Admin/components'

import Home from '@/pages/Home'
import Portfolio from '@/pages/Portfolio'
import Admin from '@/pages/Admin'
import Login from '@/pages/Login'
import Contact from '@/pages/Contact'
import Image from '@/pages/Image'


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
                path: '/image/:id',
                element: <Image />,
            },
            {
                path: '/contact',
                element: <Contact />,
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