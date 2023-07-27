import { Button, Icon } from '@/components'
import { cn } from '@/utils'
import { useUploadContext } from '@/context'
import { useState } from 'react'

export function VideoDisclosure(): React.JSX.Element {
    const { uploadToFirebase } = useUploadContext();
    const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
    const [isPreviewing, setIsPreviewing] = useState(false);
    const [error, setError] = useState<string>('');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setError('');
        if (e.target.files && e.target.files.length > 0) {
            const file: File = e.target.files[0];
            if (!file.type.startsWith('video/')) {
                setError('Yalnızca video dosyaları yükleyebilirsiniz.');
                setUploadedVideo(null);
                return;
            }
            setIsPreviewing(true);
            setUploadedVideo(file);
        }
    };

    const handleVideoOnDrop = (e: React.DragEvent<HTMLLabelElement>): void => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const file: File = e.dataTransfer.files[0];
            if (!file.type.startsWith('video/')) {
                setError('Yalnızca video dosyaları yükleyebilirsiniz.');
                setUploadedVideo(null);
                return;
            }
            setIsPreviewing(true);
            setUploadedVideo(file);
        }
    };

    const handlePostVideo = async (): Promise<void> => {
        if (!uploadedVideo) return Promise.reject('Hata');
        try {
            const downloadUrl = await uploadToFirebase(uploadedVideo, 'video');
            console.log('Video yüklendi. İndirme URL:', downloadUrl);
        } catch (error) {
            console.error('Video yükleme hatası:', error);
        }
    };

    return (
        <div className='w-full flex flex-col gap-y-4 items-center justify-center bg-primary/10 p-4 rounded'>
            <input
                type='file'
                id='videoInput'
                accept='video/*'
                onChange={handleFileChange}
                className='hidden'
            />
            {!uploadedVideo && (
                <label
                    htmlFor='videoInput'
                    className={cn(
                        'rounded-md px-4 py-2 w-full h-[200px] border-2 border-dashed flex flex-col gap-y-4 items-center justify-center',
                        isPreviewing ? 'bg-blue-200 animate-pulse text-white border-blue-600' : 'border-red-400',
                    )}
                    onDragEnter={(e) => {
                        e.preventDefault();
                        setIsPreviewing(false);
                    }}
                    onDragLeave={(e) => {
                        e.preventDefault();
                    }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleVideoOnDrop(e)}
                >
                    <Icon className='text-4xl'>{isPreviewing ? 'ondemand_video' : 'cloud_upload'}</Icon>
                    Video Sürükleyin veya Seçin
                </label>
            )}
            {uploadedVideo && (
                <>
                    <video autoPlay controls className='w-full h-auto object-fit rounded-md'>
                        <source src={URL.createObjectURL(uploadedVideo)} type='video/mp4' />
                        Video yüklenemiyor.
                    </video>
                    <Button variant='danger' onClick={() => {
                        setUploadedVideo(null);
                        setIsPreviewing(false);
                    }} className='w-full'>
                        <Icon className='text-2xl'>delete</Icon>
                        Sil
                    </Button>
                    <Button
                        variant='success'
                        className='w-full'
                        onClick={handlePostVideo}
                    >
                        <Icon className='text-2xl'>cloud_upload</Icon>
                        Yükle
                    </Button>
                </>
            )}
            {error && (
                <div className='text-red-600 w-full p-2 flex items-center justify-center gap-x-4 text-lg'>
                    <Icon className='text-2xl'>error</Icon>
                    {error}
                </div>
            )}
        </div>
    );
}
