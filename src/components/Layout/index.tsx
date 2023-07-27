import { Header, Footer } from '@/components'
import { Outlet } from 'react-router-dom'

export function Layout(): React.JSX.Element {
    return (
        <>
            <Header />
            <main className='pt-24 px-6 w-full h-full'>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}