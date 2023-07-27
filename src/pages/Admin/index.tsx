import React, { useState } from 'react'
import { cn } from '@/utils'
import { UploadProvider } from '@/context'
import { ImageDisclosure, VideoDisclosure } from '@/pages/Admin/components'
import { Icon } from '@/components'

type Disclosure = { open: boolean, type: string }

export default function Admin(): React.ReactElement {
    const [disclosure, setDisclosure] = useState<Disclosure>({
        open: false,
        type: '',
    })

    const handleDisclosureOpen = (type: string): void => {
        setDisclosure((prev: Disclosure): Disclosure => ({
            open: !prev.open || prev.type !== type,
            type: prev.type !== type ? type : '',
        }))
    }

    return (
        <UploadProvider>
            <div className='w-full h-full flex flex-col items-center justify-start gap-y-4'>
                <h1 className='text-4xl font-bold italic'>Admin</h1>
                <div
                    className='w-full flex flex-row gap-x-2 items-center justify-between p-2 transition rounded'
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
                    {disclosure.open && disclosure.type === 'image' && <ImageDisclosure />}
                    {disclosure.open && disclosure.type === 'video' && <VideoDisclosure />}
                </div>
            </div>
        </UploadProvider>
    )
}