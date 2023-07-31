import { useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { Icon } from '@/components'
import { cn } from '@/utils'
import { SEC } from '@/pages/Albums/Enums'
import { useAlbumContext } from '@/hooks/'

export function SideBar() {
    const { data, tab, setTab } = useAlbumContext()
    const isMobile = useMediaQuery('(max-width: 768px)')
    const [sidebarShow, setSidebarShow] = useState<boolean>(false)

    const [sideBarData, setSideBarData] = useState({
        date: new Date().toISOString().slice(0, 10),
        location: data[0].konum,
        name: data[0].baslik,
    })

    const applyFilters = () => {
    }

    const locations = data.map((album) => album.konum)
    const names = data.map((album) => album.baslik)
    //const date = data.map((album) => album.cekimTarihi)

    return !isMobile ? (
        <>
            <div
                className={cn(
                    'flex w-[300px] absolute left-0 top-4 bottom-4 transition bg-transparent',
                    sidebarShow ? 'translate-x-0 ' : '-translate-x-full',
                )}
                onMouseEnter={() => setSidebarShow(true)}
                onMouseLeave={() => setSidebarShow(false)}
            >
                <div
                    className='flex absolute p-4 left-4 flex-col gap-y-4 items-center justify-start w-full bg-white dark:bg-secondary backdrop-blur-sm rounded overflow-y-auto text-primary dark:text-white h-full'>
                    {Object.values(SEC).map((secValue, index) => (
                        <button
                            className={cn(
                                'flex items-center justify-center w-full p-2 rounded focus:outline-none',
                                tab === secValue ? 'bg-primary dark:bg-white text-white dark:text-primary' : 'hover:bg-gray text-primary',
                            )}
                            key={index}
                            onClick={() => setTab(secValue)}
                        >
                            {secValue === SEC.DUGUN
                                ? 'DÜĞÜN'
                                : secValue === SEC.NISAN
                                    ? 'NİŞAN'
                                    : secValue === SEC.DOGUMGUNU
                                        ? 'DOĞUM GÜNÜ'
                                        : secValue === SEC.OZELGUN
                                            ? 'ÖZEL GÜNLER'
                                            : ''}
                        </button>
                    ))}
                    <div className='flex flex-col gap-y-4 items-center justify-center w-full p-4'>
                        <p className='text-2xl text-primary dark:text-white italic capitalize w-full'>Filtreleme</p>
                        <div
                            className='flex flex-col gap-y-4 items-center justify-center w-full bg-white dark:bg-secondary rounded'>
                            <div className='flex flex-col gap-y-2 items-center justify-center w-full'>
                                <label className='flex flex-col gap-y-2 items-start justify-between w-full'>
                                    <p className='text-primary dark:text-white'>Tarih</p>
                                    <input
                                        value={sideBarData.date}
                                        onChange={(e) => setSideBarData({ ...sideBarData, date: e.target.value })}
                                        className='w-full p-2 rounded text-primary select-none dark:text-white bg-white dark:bg-secondary focus:outline-none ring-2 ring-primary dark:ring-white'
                                        type='date'
                                    />
                                    <button
                                        className='flex items-center justify-center w-full p-2 rounded bg-primary dark:bg-white text-white dark:text-primary'
                                        onClick={() => applyFilters()}
                                    >
                                        Filtrele
                                    </button>
                                </label>
                                <label className='flex flex-col gap-y-2 items-start justify-between w-full'>
                                    <p className='text-primary dark:text-white'>Yer</p>
                                    <select
                                        value={sideBarData.location}
                                        onChange={(e) => setSideBarData({ ...sideBarData, location: e.target.value })}
                                        className='w-full p-2 rounded text-primary dark:text-white bg-white dark:bg-secondary focus:outline-none ring-2 ring-primary dark:ring-white'
                                    >
                                        <option value=''>Seçiniz</option>
                                        {locations.map((location, index) => (
                                            <option value={location} key={index}>
                                                {location}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        className='flex items-center justify-center w-full p-2 rounded bg-primary dark:bg-white text-white dark:text-primary'
                                        onClick={() => applyFilters()}
                                    >
                                        Filtrele
                                    </button>
                                </label>
                                <label className='flex flex-col gap-y-2 items-start justify-between w-full'>
                                    <p className='text-primary dark:text-white'>Kişi</p>
                                    <select
                                        value={sideBarData.name}
                                        onChange={(e) => setSideBarData({ ...sideBarData, name: e.target.value })}
                                        className='w-full p-2 rounded text-primary dark:text-white bg-white dark:bg-secondary focus:outline-none ring-2 ring-primary dark:ring-white'
                                    >
                                        <option value=''>Seçiniz</option>
                                        {names.map((name, index) => (
                                            <option value={name} key={index}>
                                                {name}
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        className='flex items-center justify-center w-full p-2 rounded bg-primary dark:bg-white text-white dark:text-primary'
                                        onClick={() => applyFilters()}
                                    >
                                        Filtrele
                                    </button>
                                </label>
                            </div>
                        </div>
                    </div>
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
                    onClick={() => setTab(tab === SEC.DUGUN ? SEC.DOGUMGUNU : tab === SEC.DOGUMGUNU ? SEC.NISAN : SEC.OZELGUN)}
                >
                    <Icon className='flex items-center justify-center' children='arrow_back' />
                </button>
                <p className='text-center text-2xl text-primary dark:text-white italic font-anonymous capitalize'>
                    {tab === SEC.DUGUN
                        ? 'Düğünler'
                        : tab === SEC.NISAN
                            ? 'Nişanlar'
                            : tab === SEC.DOGUMGUNU
                                ? 'Doğum Günleri'
                                : 'Özel Günler'}
                </p>
                <button
                    className='flex items-center justify-center p-2'
                    onClick={() => setTab(tab === SEC.DUGUN ? SEC.DOGUMGUNU : tab === SEC.DOGUMGUNU ? SEC.NISAN : SEC.OZELGUN)}
                >
                    <Icon className='flex items-center justify-center' children='arrow_forward' />
                </button>
            </div>
        </div>
    )
}