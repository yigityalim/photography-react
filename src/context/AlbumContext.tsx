import React, { createContext } from 'react'
import { Cover } from '@/types'

interface AlbumContextValue {
    kapak: Cover[]
    status: 'idle' | 'loading' | 'success' | 'error'
}

export const AlbumContext: React.Context<AlbumContextValue> = createContext<AlbumContextValue>({} as AlbumContextValue)

export function AlbumProvider({ children }: { children: React.ReactNode }): React.JSX.Element {

    return (
        <AlbumContext.Provider value={{
            kapak: [],
            status: 'idle'
        }}>
            {children}
        </AlbumContext.Provider>
    )
}
