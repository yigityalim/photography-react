import { useParams } from 'react-router-dom'
import { useHandleScroll, usePicturesBySlug } from '@/hooks'
import React, { useEffect } from 'react'
import { Icon, LightBox, Loader } from '@/components'
import GraphImage from '@graphcms/react-image'
import { Helmet } from 'react-helmet'

export default function Pictures() {
    const params = useParams()
    const scrollUp = useHandleScroll(100)
    const { data, status } = usePicturesBySlug(params.customer!)

    const [columns, setColumns] = React.useState<number>(2)
    const [lightbox, setLightbox] = React.useState<{
        status: boolean
        image: number
        body: 'hidden' | ''
    } | null>(null)

    useEffect(() => {
        document.body.classList.toggle('overflow-hidden', lightbox?.status ?? false)
    }, [lightbox])

    if (status === 'loading') return <Loader fullHeight={true} />
    if (!data) return <Loader fullHeight={true} />

    return (
        <>
            <Helmet>
                <meta name='description' content='Mesut Fotoğrafçılık' />
                <meta name='keywords' content='Mesut Fotoğrafçılık' />
                <meta name='author' content='yiğit yalım' />
                <title>{data.baslik} | Mesut</title>
            </Helmet>
            <div className='flex flex-col gap-y-4 items-center justify-between w-full pb-8 md:p-16 p-4'>
                {scrollUp && (
                    <Icon
                        className='fixed z-[3000] bottom-4 right-4 p-2 bg-primary rounded-full text-white shadow cursor-pointer active:scale-95 transition'
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        arrow_upward
                    </Icon>
                )}
                <div className='w-full flex flex-col gap-x-4 items-center justify-center gap-y-4'>
                    <div className='w-full flex flex-row gap-x-4 items-center justify-between gap-y-4'>
                        <div className='flex flex-row gap-x-2 items-center justify-center gap-y-2'>
                            <input
                                type='range'
                                min={2}
                                max={5}
                                value={columns}
                                onChange={(e) => setColumns(parseInt(e.target.value))}
                                className='w-32 accent-primary bg-gray-200 rounded-full appearance-none cursor-pointer active:outline-none active:bg-gray-300 transition'
                            />
                        </div>
                        <div className='flex flex-col gap-x-2 items-end justify-center gap-y-2'>
                            <h1 className='text-lg md:text-xl lg:text-4xl font-bold'>{data.baslik}</h1>
                            <p className='text-lg font-medium'>{new Date(data.tarih).toLocaleDateString('tr-TR')}</p>
                        </div>
                    </div>

                    <div
                        className='w-full'
                        style={{
                            columns: columns,
                        }}
                    >
                        {data.resimler.map(({ url, width, height }, index: number) => (
                            <div
                                key={index}
                                className='w-full h-full cursor-pointer mb-4'
                                onClick={() =>
                                    setLightbox({
                                        status: true,
                                        image: index,
                                        body: lightbox?.body === 'hidden' ? '' : 'hidden',
                                    })
                                }
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
                    {lightbox?.status && (
                        <LightBox
                            images={data.resimler.map(({ url }) => url)}
                            setLightBox={setLightbox}
                            image={lightbox.image}
                        />
                    )}
                </div>
            </div>
        </>
    )
}
