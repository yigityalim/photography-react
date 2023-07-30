import React, { createContext } from 'react'

interface UploadContextValue {
    uploadToHygraph: (file: File, type?: 'images' | 'video') => Promise<string>;
}

export const UploadContext: React.Context<UploadContextValue | undefined> =
    createContext<UploadContextValue | undefined>(undefined)

export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    async function uploadToHygraph(file: File) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'hygaph')
        const res = await fetch(
            import.meta.env.VITE_GRAPHCMS_UPLOAD_URL, {
                method: 'POST',
                headers: { Authorization: `Bearer ${import.meta.env.VITE_GRAPHCMS_ACCES_TOKEN}`, },
                body: formData,
            },
        )
        const data = await res.json()
        return data.secure_url
    }

    const values = {
        uploadToHygraph,
    }

    return <UploadContext.Provider value={values}>{children}</UploadContext.Provider>
}

