import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAlbumBySlug } from '@/hooks'
import { Loader } from '@/components'
import GraphImage from '@graphcms/react-image'

type matchedRoutes = 'dugun' | 'nisan' | 'ozelgun' | 'dogumgunu' | 'diger'

const validRoutes: matchedRoutes[] = ['dugun', 'nisan', 'ozelgun', 'dogumgunu', 'diger']

export default function Album(): React.JSX.Element {
    const params: Readonly<Partial<{ id: matchedRoutes }>> = useParams<{ id: matchedRoutes }>()
    const { data, status } = useAlbumBySlug(params.id)

    console.log(data)

    if (!params.id || !validRoutes.includes(params.id)) return (
        <div className='flex flex-col gap-y-12 items-center justify-center w-full h-full'>
            <div className='flex flex-col gap-y-4 items-center justify-center'>
                <p className='text-2xl font-bold text-red-400'>
                    Geçersiz route!
                </p>
            </div>
            <Link to='/albums'
                  className='flex flex-row gap-x-2 items-center justify-center gap-y-2 group hover:scale-110 transition'>
                <span className='text-2xl font-bold'>
                    Geri Dön
                </span>
            </Link>
        </div>
    )

    if (status === 'loading') return <Loader fullHeight={true} />
    if (!data) return <Loader fullHeight={true} />

    return (
        <div className='p-12 columns-1 md:columns-2 lg:columns-4 space-y-6'>
            {[...data, ...data, ...data, ...data].map((customer, index) => (
                <div
                    className='w-full flex flex-col gap-x-4 items-center justify-center gap-y-4'
                    key={index}
                >
                    <Link
                        className='w-full h-full space-y-2'
                        to={`/album/${params.id}/${customer.slug}`}>
                        <span className='text-sm lg:text-xl font-bold italic'>{customer.baslik}</span>
                        <GraphImage
                            image={{
                                handle: customer.kapakFotografi.url,
                                width: customer.kapakFotografi.width,
                                height: customer.kapakFotografi.height,
                            }}
                            fadeIn={true}
                            fit='clip'
                            outerWrapperClassName='w-full h-full'
                            maxWidth={400}
                        />
                    </Link>
                </div>
            ))}
        </div>
    )
}