import React, { useEffect } from 'react'
import { useMediaQuery, useTernaryDarkMode } from 'usehooks-ts'
import { DarkModeSwitch, Icon } from '@/components'
import { cn } from '@/lib/utils'
import { Transition } from '@headlessui/react'
import { menu } from '@/lib'
import { Link, NavLink, useLocation, useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function Header(): React.JSX.Element {
    return useMediaQuery('(max-width: 768px)') ? <MobileMenu /> : <DesktopMenu />
}

function MobileMenu(): React.JSX.Element {
    const [showMenu, setShowMenu] = React.useState(false)
    const { pathname } = useLocation()
    const navigate = useNavigate()
    const { id, customer } = useParams()
    const { toggleTernaryDarkMode, isDarkMode } = useTernaryDarkMode()
    const { t } = useTranslation()

    React.useEffect(() => {
        document.body.style.overflow = showMenu ? 'hidden' : ''
    }, [showMenu])

    React.useEffect(() => {
        if (pathname === '/') setShowMenu(false)
    }, [pathname])

    useEffect(() => {
        const html: HTMLHtmlElement = document.querySelector('html') as HTMLHtmlElement
        if (html) html.classList.toggle('dark', isDarkMode)
    }, [isDarkMode])

    return (
        <>
            <header className='w-full flex items-center justify-between p-12 px-16 text-primary dark:text-white relative z-[2002]'>
                {pathname === `/album/${id}` || pathname === `/album/${id}/${customer}` ? (
                    <button onClick={() => navigate(-1)}>
                        <Icon className='text-3xl font-bold'>arrow_back</Icon>
                    </button>
                ) : (
                    <Link to='/' className='text-2xl font-bold text-start w-full italic'>
                        Mesut.
                    </Link>
                )}
                <div
                    className={cn(
                        'flex flex-row gap-x-2 items-center justify-center',
                        { hidden: pathname !== '/' },
                        { flex: pathname === '/' }
                    )}
                >
                    <Icon
                        onClick={toggleTernaryDarkMode}
                        className='text-xl cursor-pointer transform hover:scale-110 transition duration-300'
                    >
                        {isDarkMode ? 'light_mode' : 'dark_mode'}
                    </Icon>
                </div>
                <button
                    className={cn(
                        'h-8 w-8 items-center justify-center border-gray-200 ',
                        { flex: pathname !== '/' },
                        { hidden: pathname === '/' }
                    )}
                    onClick={() => setShowMenu(!showMenu)}
                >
                    <span className='sr-only'>Open main menu</span>
                    <Icon className='text-4xl'>menu</Icon>
                </button>
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
                className='fixed inset-0 z-[2003] backdrop-saturate-200 backdrop-blur-xl p-6'
                style={{ height: window.innerHeight }}
            >
                <div className='flex flex-col items-center justify-between h-full'>
                    <div className='flex items-center justify-center w-full gap-x-2'>
                        <DarkModeSwitch />
                    </div>
                    <div className='flex flex-col gap-y-8 items-center justify-center w-full'>
                        {menu.map(({ id, href, name }) => (
                            <NavLink
                                to={href}
                                key={id}
                                onClick={() => setShowMenu(false)}
                                className={({ isActive }) =>
                                    cn(
                                        'text-4xl font-black tracking-wider text-center capitalize w-full text-secondary dark:text-white italic',
                                        isActive && 'text-primary dark:text-dark-gray'
                                        // TODO /image path'ini düzelt
                                    )
                                }
                            >
                                {t(name)}
                            </NavLink>
                        ))}
                    </div>
                    <Icon className=' text-5xl text-primary dark:text-white' onClick={() => setShowMenu(false)}>
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
        const html: HTMLHtmlElement = document.querySelector('html') as HTMLHtmlElement
        if (html) html.classList.toggle('dark', isDarkMode)
    }, [isDarkMode])

    return (
        <header className='flex items-center justify-between p-6'>
            <h1 className='text-4xl font-black text-start italic'>Mesut.</h1>
            <div
                className={cn(
                    'flex flex-row gap-x-2 items-center justify-center',
                    { hidden: pathname !== '/' },
                    { flex: pathname === '/' }
                )}
            >
                <Icon
                    onClick={toggleTernaryDarkMode}
                    className='text-xl cursor-pointer transform hover:scale-110 transition duration-300'
                >
                    {isDarkMode ? 'light_mode' : 'dark_mode'}
                </Icon>
            </div>
            <div
                className={cn(
                    'flex-row gap-x-2 items-center justify-end flex w-full',
                    { hidden: pathname === '/' },
                    { flex: pathname !== '/' }
                )}
            >
                <DarkModeSwitch />
                {menu.map(({ id, href, name }) => (
                    <NavLink
                        key={id}
                        to={href}
                        className={({ isActive }) =>
                            cn(
                                'flex flex-row items-center justify-center px-4 py-2 active:scale-95 transition rounded capitalize',
                                {
                                    'bg-zinc-900 text-white dark:bg-white dark:text-black': isActive,
                                    'hover:bg-zinc-800 hover:text-white dark:hover:bg-zinc-100 dark:hover:text-zinc-900':
                                        !isActive,
                                }
                            )
                        }
                    >
                        <h1 className='text-lg font-bold'>{t(name)}</h1>
                    </NavLink>
                ))}
            </div>
        </header>
    )
}
