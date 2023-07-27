import React, { useState } from 'react'
import { useUploadContext } from '@/context'
import { cn } from '@/utils'
import { Button, Icon } from '@/components'

export function ImageDisclosure(): React.JSX.Element {
    const { uploadToFirebase } = useUploadContext()
    const [uploadedImage, setUploadedImage] = useState<File | null>(null)
    const [isDragging, setIsDragging] = useState(false)
    const [isPreviewing, setIsPreviewing] = useState(false)
    const [error, setError] = useState<string>('')
    const [isUploading, setIsUploading] = useState(false) // Yükleme durumunu takip edecek yeni durum.

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError('')
        if (e.target.files && e.target.files.length > 0) {
            const file: File = e.target.files[0]
            if (!file.type.startsWith('image/')) {
                setError('Yalnızca resim dosyaları yükleyebilirsiniz.')
                setUploadedImage(null)
                console.log(error)
                return
            } else {
                setIsPreviewing(true)
                setUploadedImage(file)
            }
        }
    }

    const handleImageOnDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
        setIsDragging(false)
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file: File = e.dataTransfer.files[0]
            if (!file.type.startsWith('image/')) {
                setError('Yalnızca resim dosyaları yükleyebilirsiniz.')
                setUploadedImage(null)
                console.log(error)
                return
            } else {
                setIsPreviewing(true)
                setUploadedImage(file)
            }
        }
    }

    const handlePostImage = async () => {
        setIsUploading(true)
        try {
            await uploadToFirebase(uploadedImage!, 'images')
            console.log('Resim yüklendi')
            setUploadedImage(null)
            setIsPreviewing(false)
            setError('')
        } catch (error) {
            console.error('Resim yükleme hatası:', error)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <div
            className='w-full flex flex-col md:flex-row gap-y-4 md:gap-x-4 items-center justify-center bg-primary/10 p-4 rounded'>
            <input type='file' id='imageInput' accept='image/*' onChange={handleFileChange} className='hidden' />
            {!uploadedImage && (
                <label
                    htmlFor='imageInput'
                    className={cn(
                        'rounded-md px-4 py-2 w-full h-[200px] border-2 border-dashed flex flex-col gap-y-4 items-center justify-center',
                        isDragging ? 'bg-blue-200 animate-pulse text-white border-blue-600' : 'border-red-400',
                    )}
                    onDragEnter={(e) => {
                        e.preventDefault()
                        setIsDragging(true)
                        setIsPreviewing(false)
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault()
                        setIsDragging(false)
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleImageOnDrop(e)}
                >
                    <Icon className='text-4xl'>{isPreviewing ? 'insert_photo' : 'cloud_upload'}</Icon>
                    Resim Sürükleyin veya Seçin
                </label>
            )}
            {uploadedImage &&
                <img src={URL.createObjectURL(uploadedImage)} alt='Resim Önizleme'
                     className='w-full h-auto md:w-6/12 object-fit rounded-md' />
            }
            {uploadedImage && (
                <div className='w-full md:w-6/12 flex items-center justify-center gap-x-4 md:flex-col md:gap-y-6'>
                    <Button variant='danger' onClick={() => {
                        setUploadedImage(null)
                        setIsPreviewing(false)
                    }} className='w-full'>
                        <Icon className='text-2xl'>delete</Icon>
                        Sil
                    </Button>
                    <Button
                        variant='success'
                        onClick={handlePostImage}
                        className='w-full'
                        disabled={isUploading}
                    >
                        {!isUploading ? (
                            <>
                                <Icon className='text-2xl'>cloud_upload</Icon>
                                Yükle
                            </>
                        ) : (
                            <>
                                <Icon className='text-2xl animate-spin rotate-180'>sync</Icon>
                                Yükleniyor
                            </>
                        )}
                    </Button>
                </div>
            )}
            {error && (
                <div className='text-red-600 w-full p-2 flex items-center justify-center gap-x-4 text-lg'>
                    <Icon className='text-2xl'>error</Icon>
                    {error}
                </div>
            )}
        </div>
    )
}