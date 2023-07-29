import { Header } from '@/components'
import { Outlet, useLocation } from 'react-router-dom'
import React from 'react'
import { cn } from '@/utils'
import { useMediaQuery } from 'usehooks-ts'

export function Layout(): React.JSX.Element {

    const { pathname } = useLocation()
    const isDesktop = useMediaQuery('(min-width: 768px)')

    return (
        <>
            <Header />
            <main className={cn(
                'w-full h-full',
                { 'pt-24': pathname === '/' && !isDesktop },
                { 'pt-24': pathname !== '/' },
            )}>
                <Outlet />
            </main>
        </>
    )
}