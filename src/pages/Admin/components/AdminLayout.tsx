import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from '@/pages/Admin/components'

export function AdminLayout(): React.JSX.Element {
    const { pathname } = useLocation()
    const isLoginAndRegister = pathname === '/admin/login' || pathname === '/admin/register'

    return (
        <>
            {!isLoginAndRegister && <Header />}
            <main className='px-6 py-4 w-full h-full'>
                <Outlet />
            </main>
        </>
    )
}