import { Button, DarkModeSwitch, Icon } from '@/components'
import React, { Fragment, useState } from 'react'
import { Link, NavigateFunction, useNavigate } from 'react-router-dom'
import { Dialog, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/utils'

export function Header(): React.JSX.Element {

    const { i18n } = useTranslation()
    const [displayName, setDisplayName] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const navigate: NavigateFunction = useNavigate()
    const user = {
        photoURL: 'https://avatars.githubusercontent.com/u/44036562?v=4',
        displayName: 'Yiğit'

    }

    return (
        <header className='px-6 py-4 w-full flex items-center justify-between'>
            <>
                <button
                    type='button'
                    onClick={() => setIsOpen(true)}
                    className='flex items-center justify-center'
                >
                    {user?.photoURL ? (
                        <div className='flex flex-row gap-x-2 items-center justify-center'>
                            <img
                                src={user?.photoURL}
                                className='w-12 h-12 rounded-full object-cover'
                                alt='profile'
                            />
                            <Icon className='h-full w-full -rotate-45'>
                                {isOpen ? 'close_fullscreen' : 'open_in_full'}
                            </Icon>
                        </div>
                    ) : (
                        <Icon
                            className='h-12 w-12 rounded-full bg-gray-200 text-primary dark:text-white dark:bg-secondary flex items-center justify-center'>
                            person
                        </Icon>
                    )}
                </button>

                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as='div' className='relative z-10' onClose={() => setIsOpen(false)}>
                        <Transition.Child
                            as={Fragment}
                            enter='ease-out duration-300'
                            enterFrom='opacity-0'
                            enterTo='opacity-100'
                            leave='ease-in duration-200'
                            leaveFrom='opacity-100'
                            leaveTo='opacity-0'
                        >
                            <div className='fixed inset-0 bg-black bg-opacity-25' />
                        </Transition.Child>

                        <div className='fixed inset-0 overflow-y-auto'>
                            <div className='flex min-h-full items-center justify-center p-4 text-center'>
                                <Transition.Child
                                    as={Fragment}
                                    enter='ease-out duration-300'
                                    enterFrom='opacity-0 scale-95'
                                    enterTo='opacity-100 scale-100'
                                    leave='ease-in duration-200'
                                    leaveFrom='opacity-100 scale-100'
                                    leaveTo='opacity-0 scale-95'
                                >
                                    <Dialog.Panel
                                        className='w-full max-w-md md:max-w-lg lg:max-w-xl flex flex-col justify-between gap-y-8 transform overflow-hidden rounded bg-white dark:bg-primary p-6 text-left align-middle shadow-xl transition-all'>
                                        <Dialog.Title as='h3'
                                                      className='text-lg font-medium leading-6 text-gray-900 dark:text-white'>
                                            <div className='flex flex-row w-full items-center justify-between'>
                                                Profili Düzenle
                                                <Icon
                                                    className='h-6 w-6 cursor-pointer text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-600 transition'
                                                    onClick={() => setIsOpen(false)}>close</Icon>
                                            </div>
                                        </Dialog.Title>
                                        <div className='flex flex-col items-center gap-y-4'>
                                            <div className='flex w-full flex-row items-end justify-between'>
                                                <label htmlFor='image'
                                                       className='w-full flex items-center justify-start'>
                                                    {user?.photoURL ? (
                                                        <img src={user?.photoURL}
                                                             className='w-24 h-24 rounded object-cover'
                                                             alt='profile' />
                                                    ) : (
                                                        <Icon
                                                            className='h-24 w-24 rounded-full bg-gray-200 text-primary dark:text-white dark:bg-secondary text-5xl flex items-center justify-center'>
                                                            person
                                                        </Icon>
                                                    )}
                                                </label>
                                                {user?.displayName ? (
                                                    <h1 className='text-3xl font-bold italic w-full items-center justify-start flex'>{displayName}</h1>
                                                ) : (
                                                    <h1 className='text-3xl font-bold italic w-full items-center justify-start flex'>Ad
                                                        Soyad</h1>
                                                )}
                                            </div>
                                            <input
                                                type='file'
                                                id='image'
                                                //onChange={(e: React.ChangeEvent<HTMLInputElement>) => uploadImage(e)}
                                                className='hidden'
                                            />
                                        </div>
                                        <div className='flex flex-row items-center justify-between gap-x-2 w-full'>
                                            <input
                                                type='text'
                                                //placeholder={user?.displayName || 'Ad Soyad'}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisplayName(e.target.value)}
                                                className={cn(
                                                    'border-2 border-gray-300 dark:border-gray-700 rounded-md p-2 focus:outline-none w-full dark:bg-secondary',
                                                )}
                                            />
                                            <Button
                                                onClick={async () => {
                                                    //await updateProfile({ displayName })
                                                    alert(i18n.language === 'en' ? 'Profile updated' : 'Profil güncellendi')
                                                }}
                                                variant='success'
                                                className='h-full'
                                            >
                                                {i18n.language === 'en' ? 'Save' : 'Kaydet'}
                                            </Button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </>
            <div className='flex flex-row gap-x-4 items-center justify-center'>
                <Link to='/' className='flex flex-row gap-x-2 items-center justify-center group'>
                    <Icon className='hidden md:block group-hover:-translate-x-1 transition group-hover:text-blue-400'>chevron_left</Icon>
                    <span className='hidden md:block group-hover:text-blue-400 transition'>Anasayfa'ya Dön</span>
                    <Icon className='block md:hidden'>home</Icon>
                </Link>
                <DarkModeSwitch className='w-12' />
                <Button variant='danger' onClick={async () => {
                    //await signOut()
                    navigate('/admin/login')
                }}>
                    {i18n.language === 'en' ? 'Sign Out' : 'Çıkış Yap'}
                </Button>
            </div>
        </header>

    )
}