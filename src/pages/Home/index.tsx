import React from 'react'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import { useHome } from '@/hooks/useHome.ts'
import { Loader } from '@/components'

export default function Home(): React.JSX.Element {
    return useMediaQuery('(min-width: 768px)') ? <DesktopView /> : <MobileView />
}

function DesktopView(): React.JSX.Element {
    const { data, isLoading, status } = useHome()
    if (isLoading) return <Loader fullHeight={true} />
    if (status === 'idle') return <Loader fullHeight={true} />
    if (!data) return <Loader fullHeight={true} />

    const randomIndex = (): number => Math.floor(Math.random() * data[0].kapakFotograflari.length)

    return (
        <>
            {data.map(({ id, baslik, aciklama, kapakFotograflari }) => (
                <div className='flex justify-center items-center h-[100dvh] bg-gray-800 text-white' key={id}>
                    <div className='w-1/2 h-full bg-gray dark:bg-primary px-16'>
                        <div className='flex flex-col gap-y-8 items-center justify-center h-full'>
                            <h1 className='text-8xl font-black leading-tight tracking-wider text-start w-full text-primary dark:text-gray italic'>
                                {baslik}
                            </h1>
                            <h2 className='text-3xl font-bold text-start w-full text-primary dark:text-gray italic'>
                                {aciklama}
                            </h2>
                            <div className='flex flex-row w-full gap-x-6'>
                                <Link
                                    to='/albums'
                                    className='bg-secondary dark:bg-gray text-white dark:text-primary w-32 flex items-center justify-center rounded-md hover:scale-110 transition active:scale-95'
                                >
                                    Portfolyom
                                </Link>
                                <Link
                                    to='/contact'
                                    className='bg-white dark:bg-secondary text-primary dark:text-white px-8 py-2 rounded-md hover:scale-110 transition active:scale-95'
                                >
                                    İletişim
                                </Link>
                            </div>
                            <p className='text-sm text-start text-primary dark:text-white w-full'>
                                © 2023 Yiğit Yalım
                            </p>
                        </div>
                    </div>
                    {kapakFotograflari.length > 0 && (
                        <img
                            className='w-1/2 h-full object-cover'
                            src={kapakFotograflari[randomIndex()].url}
                            alt='placeholder'
                        />
                    )}
                </div>
            ))}
        </>
    )
}

function MobileView(): React.JSX.Element {
    const { data, isLoading, status } = useHome()

    if (isLoading) return <Loader fullHeight={true} />
    if (status === 'idle') return <Loader fullHeight={true} />
    if (!data) return <Loader fullHeight={true} />

    const randomIndex = (): number => (data ? Math.floor(Math.random() * data[0].kapakFotograflari.length) : 0)

    return (
        <div className='flex justify-center items-end h-[calc(100dvh-8rem)] bg-gray-800 text-white pb-10 px-16'>
            {data.map(({ id, baslik, aciklama, kapakFotograflari }) => (
                <React.Fragment key={id}>
                    <div className='absolute bottom-0 left-0 right-0 top-1/2 z-[101] bg-gradient-to-t from-black to-transparent dark:from-primary dark:to-transparent' />
                    <img
                        className='fixed inset-0 z-[100] w-full h-full object-cover'
                        src={kapakFotograflari[randomIndex()].url}
                        alt='placeholder'
                    />
                    <div className='flex flex-col gap-y-8 items-center justify-center z-[102]'>
                        <h1 className='text-5xl font-black leading-tight tracking-wider text-start w-full text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-white italic'>
                            {baslik}
                        </h1>
                        <h2 className='text-xl font-bold text-start w-full text-white italic'>{aciklama}</h2>
                        <div className='flex flex-row w-full gap-x-6'>
                            <Link
                                to='/albums'
                                className='bg-secondary dark:bg-gray text-white dark:text-primary px-4 py-2 rounded-md hover:scale-110 transition active:scale-95'
                            >
                                Portfolyom
                            </Link>
                            <Link
                                to='/contact'
                                className='bg-white dark:bg-secondary text-primary dark:text-white px-8 py-2 rounded-md hover:scale-110 transition active:scale-95'
                            >
                                İletişim
                            </Link>
                        </div>
                        <p className='text-sm text-start text-white w-full'>
                            &copy; 2023.{' '}
                            <a
                                className='text-white underline'
                                target='_blank'
                                rel='noreferrer'
                                href='https://github.com/yigityalim'
                            >
                                M.Yiğit Yalım
                            </a>
                        </p>
                    </div>
                </React.Fragment>
            ))}
        </div>
    )
}
