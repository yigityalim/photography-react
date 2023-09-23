import React from 'react'
import { cn } from '@/lib/utils'

export function Loader({ fullHeight = false }: { fullHeight?: boolean }): React.JSX.Element {
    return (
        <div className={cn('w-full h-full flex items-center justify-center', fullHeight && 'h-screen')}>
            <span className="w-[200px] h-2 inline-block relative bg-dark-gray dark:bg-secondary overflow-hidden rounded-full after:content-[''] after:w-1/2 after:h-full after:bg-primary dark:after:bg-gray after:absolute after:top-0 after:left-0 after:rounded-full after:box-border after:animate-loader" />
        </div>
    )
}
