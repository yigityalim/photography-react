import React, { createContext } from 'react'
import { ref, uploadBytes } from 'firebase/storage'
import { auth, storage } from '@/firebase'
import { v4 as uuidv4 } from 'uuid'
import { useAuthState } from 'react-firebase-hooks/auth'

interface UploadContextValue {
    uploadToFirebase: (file: File, type: 'images' | 'video') => Promise<string>;
}

export const UploadContext: React.Context<UploadContextValue | undefined> =
    createContext<UploadContextValue | undefined>(undefined)

export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, loading] = useAuthState(auth)
    if (loading) return <div>Yükleniyor...</div>
    if (!user) return <div>Giriş yapmalısınız.</div>
    const uploadToFirebase = async (file: File, type: 'images' | 'video'): Promise<string> => {
        try {
            const fileId = uuidv4();
            const fileExtension = file.name.split('.').pop(); // Get the file extension

            const filePath = `${type}/${fileId}.${fileExtension}`;
            const fileRef = ref(storage, filePath);

            const response = await uploadBytes(fileRef, file);

            return response.ref.name;
        } catch (error) {
            console.error('Dosya yükleme hatası:', error);
            throw new Error('Dosya yükleme sırasında bir hata oluştu');
        }
    };

    return <UploadContext.Provider value={{ uploadToFirebase }}>{children}</UploadContext.Provider>
}

