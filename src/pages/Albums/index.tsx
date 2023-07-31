import React, { useEffect } from 'react'
import { Loader } from '@/components'
import { useAlbumContext } from '@/hooks'
import { SideBar, Slide } from '@/pages/Albums/Components'

export default function Albums(): React.JSX.Element {

    const { data, status, setActiveIndex } = useAlbumContext()

    useEffect(() => {
        const storedIndex = sessionStorage.getItem('activeIndex')
        if (storedIndex !== null) setActiveIndex(parseInt(storedIndex, 10))
    }, [setActiveIndex])

    if (status === 'loading') return <Loader fullHeight={true} />
    if (!data) return <div>Data yok</div>

    return (
        <div className='relative w-full h-full flex flex-col items-center justify-center gap-y-12 md:p-4'>
            <SideBar />
            <Slide />
        </div>
    )
}


