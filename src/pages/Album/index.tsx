import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAlbumBySlug } from '@/hooks'
import { Loader } from '@/components'
import GraphImage from '@graphcms/react-image'
import { Helmet } from 'react-helmet'
import { Cover } from '@/types'

type matchedRoutes = 'dugun' | 'nisan' | 'ozelgun' | 'dogumgunu' | 'diger'

const validRoutes: matchedRoutes[] = ['dugun', 'nisan', 'ozelgun', 'dogumgunu', 'diger']

export default function Album(): React.JSX.Element {
    const params: Readonly<Partial<{ id: matchedRoutes }>> = useParams<{ id: matchedRoutes }>()
    const { data } = useAlbumBySlug(params.id)

    if (!params.id || !validRoutes.includes(params.id)) {
        return (
            <div className='flex flex-col gap-y-12 items-center justify-center w-full h-full'>
                <div className='flex flex-col gap-y-4 items-center justify-center'>
                    <p className='text-2xl font-bold text-red-400'>Geçersiz route!</p>
                </div>
                <Link
                    to='/albums'
                    className='flex flex-row gap-x-2 items-center justify-center gap-y-2 group hover:scale-110 transition'
                >
                    <span className='text-2xl font-bold'>Geri Dön</span>
                </Link>
            </div>
        )
    }

    if (!data) return <Loader fullHeight={true} />
    const randomTitle = () => data.map((item: Cover) => item.baslik)[Math.floor(Math.random() * data.length)]
    if (data.length === 0) return <Loader fullHeight={true} />

    return (
        <>
            <Helmet>
                <meta name='description' content='Mesut Fotoğrafçılık' />
                <meta name='keywords' content='Mesut Fotoğrafçılık' />
                <meta name='author' content='yiğit yalım' />
                <title>{randomTitle()} | Mesut</title>
            </Helmet>
            <div className='p-12 md:columns-2 lg:columns-4 space-y-6'>
                {data.map(({ slug, baslik, kapakFotografi: { url, width, height } }, index) => (
                    <div className='w-full flex flex-col gap-x-4 items-center justify-center gap-y-8' key={index}>
                        <Link className='w-full h-full space-y-2' to={`/album/${params.id}/${slug}`}>
                            <span className='text-sm lg:text-xl font-bold italic'>{baslik}</span>
                            <GraphImage
                                image={{
                                    handle: url,
                                    width: width,
                                    height: height,
                                }}
                                fadeIn={true}
                                fit='clip'
                                className='z-[2002]'
                                outerWrapperClassName='w-full h-full !z-[2002]'
                                maxWidth={400}
                            />
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}
