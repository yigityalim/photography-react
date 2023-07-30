import React, { useEffect } from 'react'
import { Icon, Loader } from '@/components'
import { cn } from '@/utils'
import { motion } from 'framer-motion'
import { useWeddings } from '@/hooks'
import { Link } from 'react-router-dom'

export default function Portfolio(): React.JSX.Element {

    const { data, status } = useWeddings()
    const [activeIndex, setActiveIndex] = React.useState<number>(0)

    useEffect(() => {
        const storedIndex = sessionStorage.getItem('activeIndex');
        if (storedIndex !== null) {
            setActiveIndex(parseInt(storedIndex, 10));
        }
    }, []);

    const handleSetActiveIndex = (newIndex: number) => {
        setActiveIndex(newIndex);
        sessionStorage.setItem('activeIndex', newIndex.toString());
    };

    if (status === 'loading') return <Loader />
    if (!data) return <div>Data yok</div>

    return (
        <div className='w-full h-full flex flex-col items-center justify-center gap-y-12 md:p-24'>
            <>
                <div className='flex flex-1 items-center justify-center w-full h-full'>
                    {data.filter((_, index) => index === activeIndex).map((image, i) => (
                        <div
                            key={i}
                            className='flex flex-col gap-y-4 items-center justify-center w-full h-full'
                        >
                            <div
                                className='flex flex-row gap-x-4 items-center justify-center w-full'
                            >
                                <button
                                    className={cn(
                                        'h-full flex md:hidden items-center justify-center p-2 disabled:cursor-not-allowed',
                                        activeIndex === 0 && 'opacity-0',
                                    )}
                                    disabled={activeIndex === 0}
                                    onClick={() => handleSetActiveIndex(activeIndex - 1)}
                                >
                                    <Icon className='flex items-center justify-center' children='arrow_back' />
                                </button>
                                <Link
                                    to={`/image/${image.slug}`}
                                    className='flex flex-col gap-y-4 items-center justify-center w-full h-full'
                                >
                                    {image.isVideo ? (
                                        <video
                                            src={image.coverPhoto?.url}
                                            className='h-96 object-contain select-none'
                                            controls
                                        />
                                    ): (
                                        <img
                                            loading='lazy'
                                            src={image.coverPhoto?.url}
                                            alt='image'
                                            className='h-96 object-contain select-none'
                                        />
                                    )}
                                    <span className='text-center text-primary dark:text-white italic font-anonymous'>
                                        {image.date}
                                    </span>
                                </Link>
                                <button
                                    className={cn(
                                        'h-full flex md:hidden items-center justify-center p-2 disabled:cursor-not-allowed',
                                        activeIndex === data.length - 1 && 'opacity-0',
                                    )}
                                    disabled={activeIndex === data.length - 1}
                                    onClick={() => handleSetActiveIndex(activeIndex + 1)}
                                >
                                    <Icon className='flex items-center justify-center' children='arrow_forward' />
                                </button>
                            </div>
                            <h1
                                className='text-center text-primary dark:text-white font-anonymous'
                            >{image.title}</h1>
                        </div>
                    ))}
                </div>
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
                            disabled={activeIndex === data.length - 1}
                            className={cn(
                                'flex w-full md:w-auto items-center justify-center rounded-full p-2 disabled:cursor-not-allowed',
                                activeIndex === data.length - 1 ? 'bg-dark-gray text-primary' : 'bg-primary dark:bg-dark-gray dark:text-primary text-white',
                            )}
                            onClick={() => setActiveIndex(activeIndex + 1)}
                        >
                            <Icon children='arrow_forward' />
                        </motion.button>
                    </div>
                </div>
            </>
        </div>
    )
}