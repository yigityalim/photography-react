import { useContext } from 'react'
import { UploadContext } from '@/context'

export const useUploadContext = () => {
    const context = useContext(UploadContext)
    if (!context) {
        throw new Error('useUploadContext hook must be used within an UploadProvider')
    }
    return context
}