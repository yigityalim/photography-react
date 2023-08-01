import { Header } from '@/components'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import React from 'react'
import { AlbumProvider } from '@/context'

export function Layout(): React.JSX.Element {
    return (
        <AlbumProvider>
            <Header />
            <main className='w-full h-full'>
                <Outlet />
            </main>
            <ScrollRestoration />
        </AlbumProvider>
    )
}