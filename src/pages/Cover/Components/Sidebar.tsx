import React, { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { Icon } from '@/components'
import { cn } from '@/utils'
import { Tip } from '@/pages/Cover/Enums'
import { useAlbumContext } from '@/hooks/'

export function SideBar(): React.JSX.Element {
    const { tab, setTab } = useAlbumContext()
    const isMobile: boolean = useMediaQuery('(max-width: 768px)')
    const [sidebarShow, setSidebarShow] = useState<boolean>(false)

    return !isMobile ? (
        <>
            <div
                className={cn(
                    'flex w-[300px] absolute left-0 top-4 bottom-4 z-[9000] transition bg-transparent',
                    sidebarShow ? 'translate-x-0 ' : '-translate-x-full',
                )}
                onMouseEnter={() => setSidebarShow(true)}
                onMouseLeave={() => setSidebarShow(false)}
            >
                <div
                    className='flex absolute p-4 left-4 flex-col gap-y-4 items-center justify-start w-full bg-white dark:bg-secondary backdrop-blur-sm rounded overflow-y-auto text-primary dark:text-white h-full'>
                    {Object.values(Tip).map((secValue, index) => (
                        <button
                            className={cn(
                                'flex items-center justify-center w-full p-2 rounded focus:outline-none font-bold italic',
                                tab === secValue ? 'bg-primary dark:bg-white text-white dark:text-primary' : 'hover:bg-gray text-primary',
                            )}
                            key={index}
                            onClick={() => setTab(secValue)}
                        >
                            {secValue === Tip.DUGUN
                                ? 'DÜĞÜN'
                                : secValue === Tip.NISAN
                                    ? 'NİŞAN'
                                    : secValue === Tip.DOGUMGUNU
                                        ? 'DOĞUM GÜNÜ'
                                        : secValue === Tip.OZELGUN
                                            ? 'ÖZEL GÜNLER'
                                            : ''}
                        </button>
                    ))}
                </div>
            </div>
            {!sidebarShow && (
                <Icon
                    className='absolute top-4 left-6 select-none'
                    children='arrow_back'
                    onClick={() => setSidebarShow(true)}
                />
            )}
        </>
    ) : (
        <div
            className='relative bg-white dark:bg-primary p-4 rounded flex flex-col gap-y-4 items-center justify-center w-[400px]'>
            <div className='flex flex-row items-center justify-between w-full'>
                <button
                    className='flex items-center justify-center p-2'
                    onClick={() => setTab(tab === Tip.DUGUN ? Tip.DOGUMGUNU : tab === Tip.DOGUMGUNU ? Tip.NISAN : Tip.OZELGUN)}
                >
                    <Icon className='flex items-center justify-center' children='arrow_back' />
                </button>
                <p className='text-center text-2xl text-primary dark:text-white italic font-anonymous capitalize'>
                    {tab === Tip.DUGUN
                        ? 'Düğünler'
                        : tab === Tip.NISAN
                            ? 'Nişanlar'
                            : tab === Tip.DOGUMGUNU
                                ? 'Doğum Günleri'
                                : 'Özel Günler'}
                </p>
                <button
                    className='flex items-center justify-center p-2'
                    onClick={() => setTab(tab === Tip.DUGUN ? Tip.DOGUMGUNU : tab === Tip.DOGUMGUNU ? Tip.NISAN : Tip.OZELGUN)}
                >
                    <Icon className='flex items-center justify-center' children='arrow_forward' />
                </button>
            </div>
        </div>
    )
}