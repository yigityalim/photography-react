import React from 'react'
import { Loader } from '@/components'
import { useCover } from '@/hooks'
import GraphImage from '@graphcms/react-image'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import { cn } from '@/utils'

export default function Albums(): React.JSX.Element {

    const { data: kapak, status } = useCover()
    const isMobile = useMediaQuery('(max-width: 640px)')

    if (status === 'loading') return <Loader fullHeight={true} />
    if (!kapak) return <Loader fullHeight={true} />

    return (
        <div className='relative z-[2001] w-full h-full flex flex-col items-center justify-center gap-y-12 p-4'>
            <div className={cn(
                'w-full h-full',
                isMobile ? 'flex flex-col gap-y-4 items-center justify-center' : 'columns-2 lg:columns-4'
            )}>
                {kapak.map(({ slug, kapakFotografi, baslik, id }) => (
                    <Link
                        to={`/album/${slug}`}
                        key={id}
                        className='relative w-full h-full overflow-hidden cursor-pointer z-[2001]'
                    >
                        <GraphImage
                            image={{
                                handle: kapakFotografi.url,
                                width: kapakFotografi.width,
                                height: kapakFotografi.height,
                            }}
                            fit='clip'
                        />
                        <p className='absolute bottom-12 left-4 text-white font-bold text-3xl italic'>
                            {baslik}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}


