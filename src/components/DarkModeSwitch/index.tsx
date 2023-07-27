import React, { useEffect } from 'react'
import { useTernaryDarkMode } from 'usehooks-ts'
import { Menu } from '@headlessui/react'
import { Icon } from '@/components'
import { cn } from '@/utils'
import { motion } from 'framer-motion'

export declare type TernaryDarkMode = 'system' | 'dark' | 'light';
type ThemeSwitchProps = {
    className?: string;
    type?: 'dropdown' | 'button';
}
const themeOptions = [
    { mode: 'light', icon: 'light_mode' },
    { mode: 'dark', icon: 'dark_mode' },
    { mode: 'system', icon: 'devices' },
]

export function DarkModeSwitch({ className, type = 'dropdown' }: ThemeSwitchProps): React.JSX.Element {
    const {
        isDarkMode,
        setTernaryDarkMode,
        ternaryDarkMode,
    } = useTernaryDarkMode()

    useEffect(() => {
        const html: HTMLHtmlElement = document.querySelector(
            'html',
        ) as HTMLHtmlElement
        if (html) html.classList.toggle('dark', isDarkMode)


    }, [isDarkMode])

    if (type === 'button') {
        return (
            <div className={cn('flex flex-row gap-x-4 items-center justify-between', className)}>
                {themeOptions.map(({ mode, icon }) => (
                    <button
                        key={mode}
                        className={cn(
                            'z-20 flex px-4 p-2 flex-1 text-sm items-center justify-center',
                            ternaryDarkMode === mode && 'bg-zinc-900 dark:bg-white text-white dark:text-black active:scale-95 transition rounded',
                        )}
                        onClick={() => setTernaryDarkMode(mode as TernaryDarkMode)}
                    >
                        <Icon>{icon}</Icon>
                    </button>
                ))}
            </div>
        )
    }

    return (
        <Menu as='div' className={cn('relative w-24', className)}>
            <Menu.Button
                className={cn(
                    'z-20 flex w-full px-4 p-2 flex-1 text-sm items-center justify-center bg-zinc-900 dark:bg-white text-white dark:text-black active:scale-95 transition rounded outline-none focus:outline-none',
                )}
            >
                {themeOptions.map(({ mode, icon }) => (
                    ternaryDarkMode === mode && <Icon key={mode}>{icon}</Icon>
                ))}
            </Menu.Button>
            <Menu.Items
                as={motion.div}
                initial={{ opacity: 0, y: -10}}
                animate={{ opacity: 1, y: 0}}
                exit={{ opacity: 0, y: -10}}
                transition={{ duration: 0.3 }}
                className='absolute right-0 w-full mt-2 origin-top-right bg-white dark:bg-zinc-900 border dark:border-white border-zinc-900 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
            >
                <div className='px-1 py-1 space-y-1'>
                    {themeOptions.map(({ mode, icon }) => (
                        <Menu.Item key={mode}>
                            {({ active }) => (
                                <button
                                    className={cn(
                                        'w-full flex px-4 p-2 flex-1 text-sm items-center justify-center dark:text-white',
                                        ternaryDarkMode === mode && 'bg-zinc-900 dark:bg-white text-white dark:text-black active:scale-95 transition rounded',
                                        active && 'bg-zinc-900 dark:bg-white text-white dark:text-black active:scale-95 transition rounded',
                                    )}
                                    onClick={() => setTernaryDarkMode(mode as TernaryDarkMode)}
                                >
                                    <Icon>{icon}</Icon>
                                </button>
                            )}
                        </Menu.Item>
                    ))}
                </div>
            </Menu.Items>
        </Menu>
    )
}
