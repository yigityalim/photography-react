import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/utils'
import { Icon } from '@/components'
import { Link } from 'react-router-dom'
import Image from '@graphcms/react-image'
import { useAlbumContext } from '@/hooks'

export function Slide(): React.JSX.Element {

    const { activeIndex, setActiveIndex, filteredData } = useAlbumContext()

    return (
        <>
            <div className='hidden md:flex flex-row gap-x-4 items-center justify-between'>
                <div
                    className='flex flex-row gap-x-4 items-center justify-center w-full'
                >
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={activeIndex === 0}
                        className={cn(
                            'flex w-full md:w-auto items-center justify-center rounded-full p-2 disabled:cursor-not-allowed',
                            activeIndex === 0 ? 'bg-dark-gray text-primary dark:bg-primary dark:text-white' : 'bg-primary text-white dark:bg-dark-gray dark:text-primary',
                        )}
                        onClick={() => setActiveIndex(activeIndex - 1)}
                    >
                        <Icon className='flex items-center justify-center' children='arrow_back' />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        disabled={activeIndex === filteredData.length - 1}
                        className={cn(
                            'flex w-full md:w-auto items-center justify-center rounded-full p-2 disabled:cursor-not-allowed',
                            activeIndex === filteredData.length - 1 ? 'bg-dark-gray text-primary' : 'bg-primary dark:bg-dark-gray dark:text-primary text-white',
                        )}
                        onClick={() => setActiveIndex(activeIndex + 1)}
                    >
                        <Icon children='arrow_forward' />
                    </motion.button>
                </div>
            </div>
            <div className='flex items-center justify-center h-full w-full'>
                {filteredData.filter((_, index) => index === activeIndex).map((image, i) => (
                    <div
                        key={i}
                        className='flex flex-col gap-y-4 items-center justify-center w-full h-full focus:outline-none'
                    >
                        <div
                            className='flex flex-row gap-x-4 items-center justify-center w-full'
                        >
                            <button
                                className={cn(
                                    'h-full flex md:hidden items-center justify-center p-2 disabled:cursor-not-allowed',
                                    //activeIndex === 0 && 'opacity-0',
                                )}
                                disabled={activeIndex === 0}
                                onClick={() => setActiveIndex(activeIndex - 1)}
                            >
                                <Icon className='flex items-center justify-center' children='arrow_back' />
                            </button>
                            <Link
                                to={`/image/${image.slug}`}
                                className='flex flex-col gap-y-4 items-center justify-center w-full h-full'
                            >
                                {image.isVideo ? (
                                    <video
                                        src={image.kapakFotografi?.url}
                                        className='object-contain select-none'
                                        controls
                                    />
                                ) : (
                                    <Image image={{
                                        handle: image.kapakFotografi?.url || '',
                                        width: image.kapakFotografi?.width || 0,
                                        height: image.kapakFotografi?.height || 0,
                                    }} maxWidth={400}
                                           className='object-contain select-none cursor-pointer active:scale-95 transition w-[400px]' />
                                )}
                                <span
                                    className='text-center text-primary dark:text-white italic font-anonymous'>
                                    {new Date(image.cekimTarihi).toLocaleDateString('tr-TR')}
                                </span>
                            </Link>
                            <button
                                className={cn(
                                    'h-full flex md:hidden items-center justify-center p-2 disabled:cursor-not-allowed',
                                    //activeIndex === data.length - 1 && 'opacity-0',
                                )}
                                disabled={activeIndex === filteredData.length - 1}
                                onClick={() => setActiveIndex(activeIndex + 1)}
                            >
                                <Icon className='flex items-center justify-center' children='arrow_forward' />
                            </button>
                        </div>
                        <h1 className='text-center text-3xl text-primary dark:text-white font-anonymous'>
                            {image.baslik}
                        </h1>
                    </div>
                ))}
            </div>
        </>
    )
}