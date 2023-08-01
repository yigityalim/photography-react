import React, { createContext } from 'react'
import { Cover } from '@/types'
import { useCover } from '@/hooks'
import { Loader } from '@/components'

interface AlbumContextValue {
    kapak: Cover[]
    status: 'idle' | 'loading' | 'success' | 'error'
}

export const AlbumContext: React.Context<AlbumContextValue> = createContext<AlbumContextValue>({} as AlbumContextValue)

export function AlbumProvider({ children }: { children: React.ReactNode }): React.JSX.Element {
    const { data: kapak, status } = useCover()

    if (status === 'loading') return <Loader fullHeight={true} />
    if (!kapak) return <Loader fullHeight={true} />

    const values: AlbumContextValue = {
        kapak,
        status,
    }

    return (
        <AlbumContext.Provider value={values}>
            {children}
        </AlbumContext.Provider>
    )
}
