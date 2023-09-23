import { Icon } from '@/components'
import { Menu } from '@headlessui/react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import React from 'react'
import { useTranslation } from 'react-i18next'

type ThemeSwitchProps = {
    className?: string
    type?: 'dropdown' | 'button'
}

type MenuType = {
    name: string
    icon: string
    onClick: () => void
    lng: string
}

export function LanguageSwitch({ className, type = 'dropdown' }: ThemeSwitchProps): React.JSX.Element {
    const { i18n } = useTranslation()

    const menu: MenuType[] = [
        {
            name: 'English',
            icon: '🇬🇧',
            onClick: () => i18n.changeLanguage('en'),
            lng: 'en',
        },
        {
            name: 'Türkçe',
            icon: '🇹🇷',
            onClick: () => i18n.changeLanguage('tr'),
            lng: 'tr',
        },
    ]

    if (type === 'button')
        return (
            <div className={cn('flex flex-row gap-x-4 items-center justify-between', className)}>
                {menu.map(({ lng, icon, name, onClick }: MenuType, index: number) => (
                    <button
                        key={index}
                        className={cn(
                            'z-20 flex px-4 p-2 flex-1 gap-x-4 items-center justify-center',
                            i18n.language === lng &&
                                'bg-zinc-900 dark:bg-white text-white dark:text-black active:scale-95 transition rounded'
                        )}
                        onClick={onClick}
                    >
                        <span className='text-lg'>{icon}</span>
                        <h1 className='text-lg'>{name}</h1>
                    </button>
                ))}
            </div>
        )

    return (
        <Menu as='div' className={cn('relative w-24', className)}>
            <Menu.Button className='z-20 w-full flex px-4 p-2 flex-1 text-sm items-center justify-center bg-zinc-900 dark:bg-white text-white dark:text-black active:scale-95 transition rounded outline-none focus:outline-none'>
                <Icon>language</Icon>
            </Menu.Button>
            <Menu.Items
                as={motion.div}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className='absolute right-0 w-full mt-2 z-[100] origin-top-right bg-white dark:bg-zinc-900 border dark:border-white border-zinc-900 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
            >
                <div className='px-1 py-1 space-y-1'>
                    {menu.map(({ lng, icon, onClick }: MenuType, index: number) => (
                        <Menu.Item key={index}>
                            {({ active }) => (
                                <button
                                    className={cn(
                                        'w-full flex px-4 p-2 flex-1 items-center justify-center text-2xl',
                                        i18n.language === lng &&
                                            'bg-zinc-900 dark:bg-white text-white dark:text-black active:scale-95 transition rounded',
                                        active &&
                                            'bg-zinc-900 dark:bg-white text-white active:scale-95 transition rounded'
                                    )}
                                    onClick={onClick}
                                >
                                    {icon}
                                </button>
                            )}
                        </Menu.Item>
                    ))}
                </div>
            </Menu.Items>
        </Menu>
    )
}
