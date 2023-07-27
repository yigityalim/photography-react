import React, { useState } from 'react'
import { Loader } from '@/components'
import { Tab } from '@headlessui/react'
import { cn } from '@/utils'
import { useFetchImagesAndVideos } from '@/hooks'
import { useTranslation } from 'react-i18next'

export default function Images(): React.JSX.Element {

    const { i18n } = useTranslation()
    const [images, videos, loading, error] = useFetchImagesAndVideos()
    const [selectedTab, setSelectedTab] = useState<'images' | 'videos'>('images')

    if (loading) return <Loader fullHeight={true} />
    if (error) return <div>Error</div>

    return (
        <div className='flex flex-col gap-y-4 py-4'>
            <div className='w-full mx-auto px-2 pb-12 pt-4 sm:px-0 flex flex-col gap-y-2'>
                <h1 className='text-3xl font-bold text-gray-900 dark:text-gray-100 italic'>
                    {i18n.language === 'tr'
                        ? selectedTab === 'images'
                            ? 'Resimler'
                            : 'Videolar'
                        : selectedTab === 'images'
                            ? 'Images'
                            : 'Videos'
                    }
                </h1>
                <Tab.Group>
                    <Tab.List
                        className='flex space-x-1 rounded-xl bg-blue-900/20 dark:bg-secondary p-1 hover:cursor-pointer'>
                        <Tab
                            onClick={() => setSelectedTab('images')}
                            className={({ selected }) =>
                                cn(
                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 focus:outline-none transition',
                                    selected
                                        ? 'bg-white dark:bg-primary text-primary dark:text-white'
                                        : 'hover:bg-white/[0.12] hover:text-primary',
                                )
                            }
                        >
                            Resimler
                        </Tab>
                        <Tab
                            onClick={() => setSelectedTab('videos')}
                            className={({ selected }) =>
                                cn(
                                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700 focus:outline-none transition',
                                    selected
                                        ? 'bg-white dark:bg-primary text-primary dark:text-white'
                                        : 'hover:bg-white/[0.12] hover:text-primary',
                                )
                            }
                        >
                            Videolar
                        </Tab>
                    </Tab.List>
                    <Tab.Panels className='mt-4'>
                        <Tab.Panel className='focus:outline-none'>
                            {images.length > 0 ? (
                                <div className='flex flex-col gap-y-4 md:gap-x-4 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                                {loading ? <Loader /> : images.map((url: string, index: number) => (
                                        <div key={index} className='relative w-full'>
                                            <img loading='lazy' src={url} alt='image' className='w-full h-full rounded-md object-cover' />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='flex flex-col gap-y-4 items-center justify-center'>
                                    <h1 className='text-2xl font-bold text-gray-900 dark:text-gray-100 italic'>
                                        {i18n.language === 'tr'
                                            ? 'Resim bulunamadı.'
                                            : 'No images found.'
                                        }
                                    </h1>
                                </div>
                            )}
                        </Tab.Panel>
                        <Tab.Panel className='focus:outline-none'>
                            <div className='flex flex-col gap-y-4'>
                                {loading ? <Loader /> : videos.map((url: string, index: number) => (
                                    <div key={index} className='relative w-full'>
                                        <video src={url} controls className='w-full h-full rounded-md object-cover' />
                                    </div>
                                ))}
                            </div>
                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>
        </div>
    )
}

/*
Load işlemi:

import sha256 from 'crypto-js/sha256'
import { uploadBytes } from 'firebase/storage'

 const [assetUpload, setAssetUpload] = React.useState<File | null>(null)
<input type='file'
       onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAssetUpload(e.target.files![0])}
       className='border-2 border-gray-300 dark:border-gray-700 rounded-md p-2'
/>
<Button disabled={loading} onClick={uploadImage} variant='success'>Upload</Button>

 const uploadImage = () => {
        setLoading(true)
        if (!imageUpload) return
        if (imageUpload.type.split('/')[0] === 'image') {
            const imageRef = ref(storage, `images/${imageUpload.name + sha256(imageUpload.name)}`)
            uploadBytes(imageRef, imageUpload).then((snapshot): void => {
                getDownloadURL(snapshot.ref).then((url: string): void => {
                    setImageList((prev: string[]) => [...prev, url])
                    setLoading(false)
                })
            }).catch((e) => console.error(e))
        } else if (imageUpload.type.split('/')[0] === 'video') {
            const videoRef = ref(storage, `videos/${imageUpload.name + sha256(imageUpload.name)}`)
            uploadBytes(videoRef, imageUpload).then((snapshot): void => {
                getDownloadURL(snapshot.ref).then((url: string): void => {
                    setVideoList((prev: string[]) => [...prev, url])
                })
            }).catch((e) => console.error(e))
        }
    }

 */