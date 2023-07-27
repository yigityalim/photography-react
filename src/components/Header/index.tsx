import React from 'react'
import { useMediaQuery } from 'usehooks-ts'
import { DarkModeSwitch, Icon, LanguageSwitch } from '@/components'
import { cn } from '@/utils'
import { Transition } from '@headlessui/react'
import { menu } from '@/lib'
import { useScroll } from '@/hooks'
import { Menu } from '@/components/Menu'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '@/firebase'
import { Link } from 'react-router-dom'

export function Header(): React.JSX.Element {
    return useMediaQuery('(max-width: 768px)') ? <MobileMenu /> : <DesktopMenu />
}

function MobileMenu(): React.JSX.Element {
    const [showMenu, setShowMenu] = React.useState(false)
    const show: boolean = useScroll(80)

    React.useEffect(() => {
        document.body.style.overflow = showMenu ? 'hidden' : ''
    }, [showMenu])

    return (
        <>
            <header
                className={cn(
                    'w-full flex items-center justify-between p-6 fixed z-[2000] top-0 right-0 left-0 backdrop-saturate-200 backdrop-blur-xl transition duration-300',
                    { 'shadow-md': !showMenu },
                    { '-translate-y-full': !show },
                    { 'translate-y-0': show },
                )}>
                <h1 className='text-2xl font-bold text-start w-full'>Header</h1>
                <button className='h-8 w-8 flex items-center justify-center border-gray-200'
                        onClick={() => setShowMenu(!showMenu)}>
                    <span className='sr-only'>Open main menu</span>
                    <div className='relative'>
                        <span
                            className={cn('inline-flex absolute h-0.5 rounded w-6 bg-current transform -translate-x-1/2 transition duration-300 ease-in-out', {
                                '-rotate-45': showMenu,
                                'translate-y-1.5': !showMenu,
                            })} />
                        <span
                            className={cn('inline-flex absolute h-0.5 rounded w-6 bg-current transform -translate-x-1/2 transition duration-300 ease-in-out', { 'opacity-0': showMenu })} />
                        <span
                            className={cn('inline-flex absolute h-0.5 rounded w-6 bg-current transform -translate-x-1/2 transition duration-300 ease-in-out', {
                                'rotate-45': showMenu,
                                '-translate-y-1.5': !showMenu,
                            })} />
                    </div>
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
                className='fixed top-[5rem] right-0 left-0 z-[2000] backdrop-saturate-200 backdrop-blur-xl p-6'
                style={{ height: `${window.innerHeight - 80}px` }} // 5rem = 80px
            >
                <div className='flex flex-col gap-y-8 items-center justify-start h-full'>
                    {menu.map(({ id, href, name, icon }, index: number) => (
                        <Menu setShowMenu={setShowMenu} key={index} href={href}
                              name={name} icon={icon}
                              id={id} />
                    ))}
                    <div className='flex w-full gap-x-2'>
                        <LanguageSwitch />
                        <DarkModeSwitch />
                    </div>
                </div>
            </Transition>
        </>
    )
}

function DesktopMenu(): React.JSX.Element {
    const [user, loading] = useAuthState(auth)
    return (
        <header
            className='w-full flex items-center justify-between p-6 fixed z-[2000] top-0 right-0 left-0 bg-opacity-70 bg-white dark:bg-primary backdrop-saturate-200 backdrop-blur-xl border-b border-gray-300 dark:border-gray-700'>
            <h1 className='text-2xl font-bold text-start w-full'>Header</h1>
            <div className='flex flex-row gap-x-2'>
                <LanguageSwitch />
                <DarkModeSwitch />
                {menu.map(({ id, href, name, icon }, index: number) => (
                    <Menu desktop={true} key={index} href={href}
                          name={name} icon={icon}
                          id={id} />
                ))}
                {user && !loading ? (
                    <div className='flex flex-row gap-x-2 items-center justify-center'>
                        {user.photoURL && <img src={user?.photoURL} className='w-8 h-8 rounded-full' />}
                        <Link to='/admin' className='text-sm font-bold flex flex-row gap-x-2 items-center justify-center text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 group'>
                            {user.displayName ?? user.email}
                            <Icon className='text-xl transform group-hover:translate-x-1 transition duration-300'>
                                chevron_right
                            </Icon>
                        </Link>
                    </div>
                ) : (
                    <a href='/login' className='flex flex-row gap-x-2 items-center justify-center'>
                        <h1 className='text-sm font-bold'>Login</h1>
                    </a>
                )}
            </div>
        </header>
    )
}