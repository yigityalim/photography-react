import { Link } from 'react-router-dom'
import React from 'react'

export default function NotFound(): React.JSX.Element {
    return (
        <div className='flex flex-col gap-y-12 items-center justify-center w-full h-full'>
            <div className='flex flex-col gap-y-4 items-center justify-center'>
                <p className='text-2xl font-bold text-red-400'>
                    Geçersiz route!
                </p>
                <Link to='/albums'
                        className='flex flex-row gap-x-2 items-center justify-center gap-y-2 group hover:scale-110 transition'>
                    <span className='text-2xl font-bold'>
                        Geri Dön
                    </span>
                </Link>
            </div>
        </div>
    )
}