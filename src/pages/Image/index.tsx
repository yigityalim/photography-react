import React from 'react'
import { Link, Params, useParams } from 'react-router-dom'
import { useWeddingsBySlug } from '@/hooks'
import { Icon, Loader } from '@/components'
import { useTranslation } from 'react-i18next'

export default function Image(): React.JSX.Element {
    const params: Readonly<Params<string>> = useParams()
    const { i18n } = useTranslation()
    const { data, status } = useWeddingsBySlug(params.id!)

    if (status === 'loading') return <Loader />
    if (!data) return <Loader />
    if (data.length === 0) return (
        <div className='flex flex-col gap-y-12 items-center justify-center w-full h-full'>
            <div className='flex flex-col gap-y-4 items-center justify-center'>
                <Icon children='error_outline' className='text-4xl text-red-400' />
                <p className='text-2xl font-bold text-red-400'>
                    {i18n.language === 'en' ? 'Image not found' : 'Fotoğraf bulunamadı'}
                </p>
            </div>
            <Link to='/portfolio'
                  className='flex flex-row gap-x-2 items-center justify-center gap-y-2 group hover:scale-110 transition'>
                <Icon children='arrow_back' className='text-4xl font-bold group-hover:-translate-x-2 transition' />
                <span className='text-2xl font-bold'>
                    {i18n.language === 'en' ? 'Back' : 'Geri Dön'}
                </span>
            </Link>
        </div>
    )

    return (
        <div
            className='flex flex-col gap-y-4 items-center justify-between w-full pb-8 md:p-16'
        >
            <div>
                {data.map(({title, date, images}, index) => (
                    <div
                        key={index}
                        className='flex flex-col gap-x-4 items-center justify-center gap-y-4'
                    >
                        <h1 className='text-2xl font-bold'>
                            {title}
                        </h1>
                        <p className='text-lg'>
                            {date}
                        </p>
                        <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                            {images.map(({url}) => (
                                <img
                                    src={url}
                                    alt=''
                                    className='w-full object-cover'
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <Link to='/portfolio'
                  className='hidden md:flex flex-row gap-x-2 items-center justify-center gap-y-2 group hover:scale-110 transition'>
                <Icon children='arrow_back' className='text-4xl font-bold group-hover:-translate-x-2 transition' />
                <span className='text-2xl font-bold'>
                    {i18n.language === 'en' ? 'Back' : 'Geri Dön'}
                </span>
            </Link>
        </div>
    )
}