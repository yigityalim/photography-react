import React from 'react'
import { Loader } from '@/components'
import { useAlbumContext } from '@/hooks'
import GraphImage from '@graphcms/react-image'
import { Link } from 'react-router-dom'

export default function Albums(): React.JSX.Element {

    const { kapak, status } = useAlbumContext()
    if (status === 'loading') return <Loader fullHeight={true} />
    if (!kapak) return <Loader fullHeight={true} />

    return (
        <div className='relative w-full h-full flex flex-col items-center justify-center gap-y-12 p-4'>
            <div className='w-full h-full columns-1 md:columns-2 lg:columns-3'>
                {kapak.map(({ slug, kapakFotografi, baslik }, index: number) => (
                    <Link
                        to={`/album/${slug}`}
                        key={index}
                        className='relative w-[400px] overflow-hidden cursor-pointer'
                    >
                        <GraphImage
                            image={{
                                handle: kapakFotografi.url,
                                width: kapakFotografi.width,
                                height: kapakFotografi.height,
                            }}
                            fit='clip'
                        />
                        <p className='absolute bottom-4 left-4 text-white font-bold text-3xl italic'>
                            {baslik}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}


