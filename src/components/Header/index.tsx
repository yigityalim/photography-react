import React, { useEffect } from 'react'
import { useMediaQuery, useTernaryDarkMode } from 'usehooks-ts'
import { DarkModeSwitch, Icon, LanguageSwitch } from '@/components'
import { cn } from '@/utils'
import { Transition } from '@headlessui/react'
import { menu } from '@/lib'
import { useScroll } from '@/hooks'
import { Link, NavLink, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function Header(): React.JSX.Element {
    return useMediaQuery('(max-width: 768px)') ? <MobileMenu /> : <DesktopMenu />
}

function MobileMenu(): React.JSX.Element {
    const [showMenu, setShowMenu] = React.useState(false)
    const show = useScroll(80)
    const { pathname } = useLocation()
    console.log(pathname)
    const { id } = useParams();
    const { toggleTernaryDarkMode, isDarkMode } = useTernaryDarkMode()
    const { t } = useTranslation()

    React.useEffect(() => {
        document.body.style.overflow = showMenu ? 'hidden' : ''
    }, [showMenu])

    React.useEffect(() => {
        if (pathname === '/') setShowMenu(false)
    }, [pathname])


    useEffect(() => {
        const html: HTMLHtmlElement = document.querySelector(
            'html',
        ) as HTMLHtmlElement
        if (html) html.classList.toggle('dark', isDarkMode)
    }, [isDarkMode])

    return (
        <>
            <header
                className={cn(
                    'w-full flex items-center justify-between p-6 px-16 fixed z-[2000] top-0 right-0 left-0',
                    { '-translate-y-full': !show },
                    { 'translate-y-0': show },
                    { 'backdrop-saturate-200 backdrop-blur-xl transition duration-300': pathname !== '/' },
                    { 'pt-16': pathname === '/' },
                    { 'pt-16': pathname === '/' },
                )}
            >
                {pathname === `/image/${id}` && (
                    <Link to='/portfolio' className='w-full'>
                        <Icon className='text-3xl font-bold'>arrow_back</Icon>
                    </Link>
                )}
                <h1 className={cn(
                    'text-2xl font-bold text-start w-full italic',
                    pathname === `/image/${id}` ? 'text-end' : 'text-start',
                )}>LO</h1>
                <div className={cn(
                    'flex flex-row gap-x-2 items-center justify-center',
                    { 'hidden': pathname !== '/' },
                    { 'flex': pathname === '/' },
                )}>
                    <Icon
                        onClick={toggleTernaryDarkMode}
                        className='text-xl cursor-pointer transform hover:scale-110 transition duration-300'
                    >
                        {isDarkMode ? 'light_mode' : 'dark_mode'}
                    </Icon>
                </div>
                {pathname !== `/image/${id}` && (
                    <button className={cn(
                        'h-8 w-8 items-center justify-center border-gray-200 ',
                        { 'flex': pathname !== '/' },
                        { 'hidden': pathname === '/' },
                    )}
                            onClick={() => setShowMenu(!showMenu)}>
                        <span className='sr-only'>Open main menu</span>
                        <Icon className='text-3xl'>menu</Icon>
                    </button>
                )}
            </header>
            <Transition
                show={showMenu}
                as='div'
                enter='transition ease-in-out duration-300'
                enterFrom='opacity-0 scale-95 translate-y-1'
                enterTo='opacity-100 scale-100 translate-y-0'
                leave='transition ease-in-out duration-300'
                leaveFrom='opacity-100 scale-100 translate-y-0'
                leaveTo='opacity-0 scale-95 translate-y-1'
                className='fixed inset-0 z-[2000] backdrop-saturate-200 backdrop-blur-xl p-6'
                style={{ height: window.innerHeight}} // 5rem = 80px
            >
                <div className='flex flex-col items-center justify-between h-full'>
                    <div className='flex items-center justify-center w-full gap-x-2'>
                        <LanguageSwitch />
                        <DarkModeSwitch />
                    </div>
                    <div className='flex flex-col gap-y-8 items-center justify-center w-full'>
                        {menu.map(({ id, href, name }) => (
                            <NavLink to={href} key={id}
                                     className={({ isActive }) => cn(
                                         'text-4xl font-black tracking-wider text-center capitalize w-full text-secondary dark:text-white italic',
                                         isActive && 'text-primary dark:text-dark-gray',
                                         // TODO /image path'ini düzelt
                                     )}>
                                {t(name)}
                            </NavLink>
                        ))}
                    </div>
                    <Icon
                        className=' text-5xl text-white'
                        onClick={() => setShowMenu(false)}
                    >
                        close
                    </Icon>
                </div>
            </Transition>
        </>
    )
}

function DesktopMenu(): React.JSX.Element {
    const { t } = useTranslation()
    const { pathname } = useLocation()
    const { toggleTernaryDarkMode, isDarkMode } = useTernaryDarkMode()

    useEffect(() => {
        const html: HTMLHtmlElement = document.querySelector(
            'html',
        ) as HTMLHtmlElement
        if (html) html.classList.toggle('dark', isDarkMode)
    }, [isDarkMode])

    return (
        <header
            className={cn(
                'flex items-center justify-between p-6 fixed z-[2000] top-0 right-0 left-0',
                { 'w-1/2 text-primary dark:text-white px-16': pathname === '/' },
                { 'w-full bg-opacity-70 bg-gray dark:bg-primary backdrop-saturate-200 backdrop-blur-xl': pathname !== '/' },
            )}>
            <h1 className='text-4xl font-black text-start italic'>LO</h1>
            <div className={cn(
                'flex flex-row gap-x-2 items-center justify-center',
                { 'hidden': pathname !== '/' },
                { 'flex': pathname === '/' },
            )}>
                <Icon
                    onClick={toggleTernaryDarkMode}
                    className='text-xl cursor-pointer transform hover:scale-110 transition duration-300'
                >
                    {isDarkMode ? 'light_mode' : 'dark_mode'}
                </Icon>
            </div>
            <div className={cn(
                'flex-row gap-x-2 items-center justify-end flex w-full',
                { 'hidden': pathname === '/' },
                { 'flex': pathname !== '/' },
            )}>
                <LanguageSwitch />
                <DarkModeSwitch />
                {menu.map(({ id, href, name }) => (
                    <NavLink
                        key={id}
                        to={href}
                        className={({ isActive }) => cn("flex flex-row items-center justify-center px-4 py-2 active:scale-95 transition rounded capitalize", {
                            "bg-zinc-900 text-white dark:bg-white dark:text-black": isActive,
                            "hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900": !isActive
                        })}
                    >
                        <h1 className="text-lg font-bold">{t(name)}</h1>
                    </NavLink>
                ))}
            </div>
        </header>
    )
}