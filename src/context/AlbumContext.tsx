import React, { createContext, useState } from 'react'
import { Album } from '@/types'
import { SEC } from '@/pages/Albums/Enums'
import { useAlbums } from '@/hooks'
import { Loader } from '@/components'

interface AlbumContextValue {
    data: Album[]
    status: 'idle' | 'loading' | 'success' | 'error'
    tab: SEC
    setTab: React.Dispatch<React.SetStateAction<SEC>>
    activeIndex: number,
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>

    filteredData: Album[]
}

export const AlbumContext: React.Context<AlbumContextValue> = createContext<AlbumContextValue>({} as AlbumContextValue)

export function AlbumProvider({ children }: { children: React.ReactNode }): React.JSX.Element {

    const { data, status } = useAlbums()
    const [activeIndex, setActiveIndex] = React.useState<number>(0)
    const [tab, setTab] = useState<SEC>(SEC.DUGUN)

    if (status === 'loading') return <Loader fullHeight={true} />
    if (!data) return <Loader fullHeight={true} />

    const filteredData: Album[] = data.filter((image) => image.sec === tab)

    const values: AlbumContextValue = {
        data,
        status,
        tab,
        setTab,
        activeIndex,
        setActiveIndex,
        filteredData,
    }

    return <AlbumContext.Provider value={values}>{children}</AlbumContext.Provider>
}