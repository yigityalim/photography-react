import React, { useEffect, useState } from 'react'
import Placeholder from '@/assets/unsplash_JFwWxSbEQE8.png'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'

export default function Home(): React.JSX.Element {
    const [buttonTextIndex, setButtonTextIndex] = useState(0)

    const buttonTextOptions = [
        'Düğünler',
        'Portreler',
        'Doğum Günleri',
        'Diğer',
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setButtonTextIndex((prevIndex) =>
                prevIndex === buttonTextOptions.length - 1 ? 0 : prevIndex + 1,
            )
        }, 2000)

        return () => clearInterval(interval)
    }, [buttonTextOptions.length])

    const buttonText = buttonTextOptions[buttonTextIndex]
    return useMediaQuery('(min-width: 768px)') ? <DesktopView buttonText={buttonText} /> : <MobileView buttonText={buttonText} />
}

function DesktopView({ buttonText, }: { buttonText: string }) {

    return (
        <div className='flex justify-center items-center h-[100dvh] bg-gray-800 text-white'
        >
            <div className='w-1/2 h-full bg-gray dark:bg-primary px-16'>
                <div className='flex flex-col gap-y-8 items-center justify-center h-full'>
                    <h1 className='text-8xl font-black leading-tight tracking-wider text-start w-full text-primary dark:text-gray italic'>Benim
                        adım Yiğit.</h1>
                    <h2 className='text-3xl font-bold text-start w-full text-primary dark:text-gray italic'>Ben bir
                        fotoğrafçıyım</h2>
                    <div className='flex flex-row w-full gap-x-6'>
                        <Link to='/albums'
                              className='bg-secondary dark:bg-gray text-white dark:text-primary w-32 flex items-center justify-center rounded-md hover:scale-110 transition active:scale-95'>
                            {buttonText}
                        </Link>
                        <Link to='/contact'
                              className='bg-white dark:bg-secondary text-primary dark:text-white px-8 py-2 rounded-md hover:scale-110 transition active:scale-95'>İletişim</Link>
                    </div>
                    <p className='text-sm text-start text-primary dark:text-white w-full'>© 2023 Yiğit Yalım</p>
                </div>
            </div>
            <img className='w-1/2 h-full bg-gray dark:bg-primary object-cover'
                 src={Placeholder} alt='placeholder'></img>
        </div>
    )
}

function MobileView({ buttonText, }: { buttonText: string }) {
    return (
        <div className='flex justify-center items-end h-[calc(100dvh-5rem)] bg-gray-800 text-white pb-10 px-16'>
            <div
                className='absolute bottom-0 left-0 right-0 top-1/2 z-[101] bg-gradient-to-t from-black to-transparent dark:from-primary dark:to-transparent' />
            <img className='fixed inset-0 z-[100] w-full h-full object-cover'
                 src={Placeholder} alt='placeholder' />
            <div className='flex flex-col gap-y-8 items-center justify-center z-[102]'>
                <h1 className='text-5xl font-black leading-tight tracking-wider text-start w-full text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-white italic'>Benim
                    adım Yiğit.</h1>
                <h2 className='text-xl font-bold text-start w-full text-white italic'>Ben bir
                    fotoğrafçıyım</h2>
                <div className='flex flex-row w-full gap-x-6'>
                    <Link to='/portfolio'
                          className='bg-secondary dark:bg-gray text-white dark:text-primary px-4 py-2 rounded-md hover:scale-110 transition active:scale-95'>{buttonText}</Link>
                    <Link to='/contact'
                          className='bg-white dark:bg-secondary text-primary dark:text-white px-8 py-2 rounded-md hover:scale-110 transition active:scale-95'>İletişim</Link>
                </div>
                <p className='text-sm text-start text-white w-full'>© 2023 Yiğit Yalım</p>
            </div>
        </div>
    )
}