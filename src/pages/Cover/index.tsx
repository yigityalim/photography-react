import React from 'react'
import { Loader } from '@/components'
import { useCover } from '@/hooks'
import GraphImage from '@graphcms/react-image'
import { Link } from 'react-router-dom'
import { useMediaQuery } from 'usehooks-ts'
import { cn } from '@/lib/utils'
import { Helmet } from 'react-helmet'
import { AnimatePresence, motion } from 'framer-motion'

export default function Albums(): React.JSX.Element {
    //  const targetRef = useRef(null)

    // const { scrollYProgress } = useScroll()

    const { data: kapak, status } = useCover()
    const isMobile = useMediaQuery('(max-width: 640px)')
    /*

    const opacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3, 0.4], [0, 0.25, 0.5, 0.75, 1])
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0])
    const translateY = useTransform(scrollYProgress, [1, 0], [0, 1])
     */

    if (status === 'loading') return <Loader fullHeight={true} />
    if (!kapak) return <Loader fullHeight={true} />
    return (
        <>
            <Helmet>
                <meta name='description' content='Albümler' />
                <meta
                    name='keywords'
                    content='Albümler, albüm, fotoğraf, fotoğrafçılık, fotoğrafçı, fotoğrafçılar, düğün'
                />
                <meta name='author' content='yiğit yalım' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0 maximum-scale=1.0 user-scalable=no'
                />
                <meta name='robots' content='index, follow' />
                <title>Albümler</title>
            </Helmet>
            <motion.div className='relative z-[2001] w-full h-full flex flex-col items-center justify-center gap-y-12 p-12'>
                <div
                    className={cn(
                        'w-full h-full',
                        isMobile ? 'flex flex-col gap-y-8 items-center justify-center' : 'columns-2 lg:columns-4'
                    )}
                >
                    <AnimatePresence>
                        {kapak.map(({ slug, kapakFotografi, baslik, id }, index) => (
                            <motion.div
                                key={index}
                                className='relative w-full h-full overflow-hidden cursor-pointer z-[2001]'
                            >
                                <Link to={`/album/${slug}`} key={id} className='w-full h-full'>
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
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>
        </>
    )
}
