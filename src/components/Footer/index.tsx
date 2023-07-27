import React from 'react'
import { DarkModeSwitch, LanguageSwitch } from '@/components'
import { menu } from '@/lib'
import { Menu } from '@/components/Menu'

export function Footer(): React.JSX.Element {
    return (
        <footer
            className='w-full flex flex-col gap-y-4 justify-center items-center bg-gray-100 dark:bg-secondary text-sm font-medium p-6'
        >
            <div className='flex flex-row w-full justify-between items-center'>
                <h1 className='text-2xl font-bold text-start w-full'>Footer</h1>
                <DarkModeSwitch type='button' className='ml-auto' />
            </div>
            <LanguageSwitch type='button' className='w-full' />
            <div className='flex flex-col gap-y-3 w-full justify-between items-center'>
                {menu.map(({ id, href, name, icon }, index: number) => (
                    <Menu key={index} href={href} name={name} icon={icon} id={id} />
                ))}
            </div>
        </footer>
    )
}

//<h1>© 2021 - All rights reserved</h1>