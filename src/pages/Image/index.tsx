import React, { useEffect } from 'react'
import { Link, Params, useParams } from 'react-router-dom'
import { useAlbumBySlug, useHandleScroll } from '@/hooks'
import { Icon, LightBox, Loader } from '@/components'
import { useTranslation } from 'react-i18next'
import GraphImage from '@graphcms/react-image'

export default function Image(): React.JSX.Element {
    const params: Readonly<Params<string>> = useParams()
    const { i18n } = useTranslation()
    const scrollUp = useHandleScroll(100)
    const { data, status } = useAlbumBySlug(params.id!)
    const [lightbox, setLightbox] = React.useState<{
        status: boolean,
        image: number,
        body: 'hidden' | ''
    } | null>(null)

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', lightbox?.status ?? false)
    }, [lightbox])

    if (status === 'loading') return <Loader fullHeight={true} />
    if (!data) return <Loader fullHeight={true} />

    if (data.resimler.length === 0) return (
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
            className='flex flex-col gap-y-4 items-center justify-between w-full pb-8 md:p-16 p-4'
        >
            {scrollUp && (
                <Icon
                    className='fixed bottom-4 right-4 p-2 bg-primary rounded-full text-white shadow cursor-pointer active:scale-95 transition'
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                    arrow_upward
                </Icon>
            )}
            <div
                className='w-full flex flex-col gap-x-4 items-center justify-center gap-y-4'
            >
                <div className='w-full flex flex-row gap-x-4 items-center justify-center gap-y-4'>
                    <Link to='/albums'
                          className='mr-auto hidden md:flex flex-row gap-x-2 items-center justify-center gap-y-2 group hover:scale-110 transition'>
                        <Icon children='arrow_back'
                              className='text-4xl font-bold group-hover:-translate-x-2 transition' />
                        <p className='text-2xl font-bold'>{i18n.language === 'en' ? 'Back' : 'Geri Dön'}</p>
                    </Link>
                    <div className='flex flex-col gap-x-2 items-end justify-center gap-y-2'>
                        <h1 className='text-4xl font-bold'>
                            {data.baslik}
                        </h1>
                        <p className='text-lg font-medium'>
                            {new Date(data.cekimTarihi).toLocaleDateString('tr-TR')}
                        </p>
                    </div>
                </div>

                <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                    {data.resimler.map(({ url, width, height }, index: number) => (
                        <div
                            key={index}
                            className='w-full h-full cursor-pointer'
                            onClick={() => setLightbox({
                                status: true,
                                image: index,
                                body: lightbox?.body === 'hidden' ? '' : 'hidden',
                            })}
                        >
                            <GraphImage
                                image={{
                                    handle: url,
                                    width: width,
                                    height: height,
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {lightbox?.status && (
                <LightBox
                    images={data.resimler.map(({ url }) => url)}
                    setLightBox={setLightbox}
                    image={lightbox.image}
                />
            )}
        </div>
    )
}