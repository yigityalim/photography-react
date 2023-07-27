import { NavLink } from 'react-router-dom'
import React from 'react'
import { Icon } from '@/components'
import { MenuType } from '@/lib'
import { cn } from '@/utils'
import { useTranslation } from 'react-i18next'

type MenuProps = {
    setShowMenu?: React.Dispatch<React.SetStateAction<boolean>>
    desktop?: boolean
} & MenuType

export function Menu({ desktop, icon, name, href, setShowMenu }: MenuProps): React.JSX.Element {
    const {t} = useTranslation()

    if (desktop) return (
        <NavLink
            to={href}
            className={({ isActive }) => cn("flex flex-row gap-x-4 items-center justify-between px-2 py-1 active:scale-95 transition rounded capitalize", {
                "bg-zinc-900 text-white dark:bg-white dark:text-black": isActive,
                "hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900": !isActive
            })}
        >
            <Icon className='text-lg'>{icon}</Icon>
            <h1 className="text-md font-bold">{t(name)}</h1>
        </NavLink>
    )

    return (
        <NavLink
            to={href}
            onClick={() => setShowMenu && setShowMenu(false)}
            className={({ isActive }) => cn("w-full flex flex-row gap-x-4 items-center justify-between p-2 active:scale-95 transition rounded capitalize", {
                "bg-zinc-900 text-white dark:bg-white dark:text-black": isActive,
                "hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900": !isActive
            })}
        >
            <Icon className='text-xl'>{icon}</Icon>
            <h1 className="text-lg font-bold">{t(name)}</h1>
        </NavLink>
    )
}