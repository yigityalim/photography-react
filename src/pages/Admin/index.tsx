import React, { useState } from 'react'
import { cn } from '@/utils'
import { UploadProvider } from '@/context'
import { Icon } from '@/components'
import slugify from 'slugify'
import { format } from 'date-fns'

type Disclosure = { open: boolean, type: string }

export default function Admin(): React.ReactElement {
    const [disclosure, setDisclosure] = useState<Disclosure>({
        open: false,
        type: '',
    })
    const [loading, setLoading] = useState<boolean>(false)
    const [title, setTitle] = useState<string>('')
    const [coverPhoto, setCoverPhoto] = useState<File | null>(null)
    const [images, setImages] = useState<FileList>()
    const formData: FormData = new FormData()

    const handleDisclosureOpen = (type: string): void => {
        setDisclosure((prev: Disclosure): Disclosure => ({
            open: !prev.open || prev.type !== type,
            type: prev.type !== type ? type : '',
        }))
    }

    const handleUpload = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);

        const date = new Date();
        const slug = slugify(title, { lower: true, strict: true });
        const formattedDate = format(date, "dd/MM/yyyy, HH:mm:ss");

        formData.append('title', title);
        formData.append('slug', slug);
        formData.append('date', formattedDate);

        if (coverPhoto) {
            formData.append('coverPhoto', coverPhoto);
        }
        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }
        const res = await fetch(
            'https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/clknv0kmu0unv01up98u00myc/master/upload'
            , {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${import.meta.env.VITE_GRAPHCMS_ACCES_TOKEN}`,
                },
                body: formData,
            },
        )
        console.log(res)
        const data = await res.json()
        setLoading(false);
        return data.secure_url
    };

    return (
        <UploadProvider>
            <form onSubmit={handleUpload} className='w-full h-full flex flex-col items-center justify-start gap-y-4'>
                <h1 className='text-4xl font-bold italic'>Admin</h1>
                <input
                    type='text'
                    placeholder='Başlık Giriniz:'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <label
                    className='flex flex-col gap-y-2 items-center justify-between p-2 transition rounded border-2 border-dashed border-red-400 select-none cursor-pointer'
                >
                    <span>Başlık Resmi Yükle</span>
                    <input
                        className='hidden'
                        onChange={(e) => setCoverPhoto(e.target.files?.[0] || null)}
                        type='file' />
                </label>
                <label>
                </label>
                <div
                    className='w-full flex flex-col gap-y-2 items-center justify-between p-2 transition rounded'
                >
                    <div
                        className={cn(
                            'flex flex-1 flex-row gap-x-4 items-center justify-center p-2 transition rounded border-2 border-dashed border-red-400 select-none cursor-pointer',
                            {
                                'bg-zinc-900 text-white dark:bg-white dark:text-black': disclosure.open && disclosure.type === 'image',
                                'border-transparent': disclosure.open && disclosure.type === 'image',
                            },
                        )}
                        onClick={() => handleDisclosureOpen('image')}
                    >
                        <Icon className='text-xl'>insert_photo</Icon>
                        Resim Yükle
                    </div>
                    <div
                        className={cn(
                            'flex flex-1 flex-row gap-x-4 items-center justify-center p-2 transition rounded border-2 border-dashed border-red-400 select-none cursor-pointer',
                            {
                                'bg-zinc-900 text-white dark:bg-white dark:text-black': disclosure.open && disclosure.type === 'video',
                                'border-transparent': disclosure.open && disclosure.type === 'video',
                            },
                        )}
                        onClick={() => handleDisclosureOpen('video')}
                    >
                        <Icon className='text-xl'>ondemand_video</Icon>
                        Video Yükle
                    </div>
                </div>
                <div className='w-full flex flex-col gap-y-4 items-center justify-center'>
                    <label>
                        <input
                            type='file'
                            className='hidden'
                            onChange={(e) => setImages(e.target.files as FileList)}
                            multiple
                        />
                        <span className='p-2 transition rounded border-2 border-dashed border-red-400 select-none cursor-pointer'>
                            Resimleri Yükle
                        </span>
                    </label>
                </div>
                <button
                    className='p-2 transition rounded border-2 border-dashed border-red-400 select-none cursor-pointer'
                    type='submit'
                >
                    <Icon className='text-xl'>
                        {loading ? 'hourglass_empty' : 'upload'}
                    </Icon>
                </button>
            </form>
        </UploadProvider>
    )
}