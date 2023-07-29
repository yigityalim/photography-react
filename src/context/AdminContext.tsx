import React, { createContext } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface UploadContextValue {
    uploadToFirebase: (file: File, type: 'images' | 'video') => Promise<string>;
}

export const UploadContext: React.Context<UploadContextValue | undefined> =
    createContext<UploadContextValue | undefined>(undefined)

export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    return <UploadContext.Provider value={{
        uploadToFirebase: async (file, type) => {
            return new Promise((resolve, reject) => {
                return resolve(uuidv4())
            })
        }
    }}>{children}</UploadContext.Provider>
}

