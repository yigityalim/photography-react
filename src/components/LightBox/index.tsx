import React, { useEffect } from 'react'
import { Icon } from '@/components'
import { cn } from '@/lib/utils'

type LightBoxProps = {
    images: string[]
    width?: number
    image: number
    height?: number
    setLightBox: React.Dispatch<
        React.SetStateAction<{
            status: boolean
            image: number
            body: 'hidden' | ''
        } | null>
    >
}

export function LightBox({ images, image, setLightBox }: LightBoxProps): React.JSX.Element {
    const [imageIndex, setImageIndex] = React.useState<number>(image)
    const [openBottomBar, setOpenBottomBar] = React.useState<boolean>(false)

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setLightBox({
                    status: false,
                    image: 0,
                    body: '',
                })
            }
        }
        document.addEventListener('keydown', handleEscape)
        return () => document.removeEventListener('keydown', handleEscape)
    }, [setLightBox])

    return (
        <div className='fixed inset-0 z-[9000] bg-primary bg-opacity-20 backdrop-blur-3xl'>
            <Icon
                className='fixed top-4 right-4 p-2 bg-primary rounded-full text-white shadow cursor-pointer active:scale-95 transition '
                onClick={() =>
                    setLightBox({
                        status: false,
                        image: 0,
                        body: '',
                    })
                }
            >
                close
            </Icon>
            {!(imageIndex === 0) && (
                <Icon
                    className='select-none hidden md:flex fixed top-1/2 left-4 p-2 bg-primary rounded-full text-white shadow cursor-pointer active:scale-95 transition'
                    onClick={() => setImageIndex((prev) => (prev - 1) % images.length)}
                >
                    chevron_left
                </Icon>
            )}
            {!(imageIndex === images.length - 1) && (
                <Icon
                    className='select-none hidden md:flex fixed top-1/2 right-4 p-2 bg-primary rounded-full text-white shadow cursor-pointer active:scale-95 transition'
                    onClick={() => setImageIndex((prev) => (prev + 1) % images.length)}
                >
                    chevron_right
                </Icon>
            )}
            <div className='w-full h-full flex flex-row items-center justify-center gap-x-4 gap-y-4'>
                <img src={images[imageIndex]} alt='' className='w-full h-full object-contain snap-start' />
            </div>
            <Icon
                className={cn(
                    'hidden md:flex absolute left-4 p-2 bg-primary rounded-full text-white shadow cursor-pointer active:scale-95 transition-all select-none',
                    openBottomBar ? 'bottom-28' : 'bottom-4'
                )}
                onClick={() => setOpenBottomBar((prev) => !prev)}
            >
                {openBottomBar ? 'expand_more' : 'expand_less'}
            </Icon>
            <div
                className={cn(
                    'fixed z-[9001] p-4 left-0 right-0 hidden md:flex bg-primary/20 flex-row gap-x-4 items-center justify-center gap-y-4 overflow-x-auto whitespace-nowrap transition-all',
                    openBottomBar ? 'bottom-0' : '-bottom-96'
                )}
            >
                {images.map((image: string, index: number) => (
                    <img
                        key={index}
                        src={image}
                        loading='lazy'
                        alt=''
                        className='w-16 h-16 object-cover active:scale-90 transition'
                        onClick={() => setImageIndex(index)}
                    />
                ))}
            </div>
            <div className='md:hidden flex flex-row gap-x-2 fixed bottom-4 left-4 right-4 items-center justify-between'>
                <button
                    className={cn(
                        'w-1/2 bg-primary rounded text-white shadow cursor-pointer active:scale-95 transition text-center',
                        'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                    onClick={() => {
                        if (imageIndex === 0) setImageIndex(images.length)
                        setImageIndex((prev) => (prev - 1) % images.length)
                    }}
                >
                    <Icon children='chevron_left' className='text-2xl' />
                </button>
                <button
                    className={cn(
                        'w-1/2 bg-primary rounded text-white shadow cursor-pointer active:scale-95 transition text-center',
                        'disabled:opacity-50 disabled:cursor-not-allowed'
                    )}
                    onClick={() => {
                        if (imageIndex === images.length) setImageIndex(0)
                        setImageIndex((prev) => (prev + 1) % images.length)
                    }}
                >
                    <Icon children='chevron_right' className='text-2xl' />
                </button>
            </div>
        </div>
    )
}

/*

BUTONLARI RESİMİN ÜZERİNDE İSTERSE


 */
