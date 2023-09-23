import React from 'react'
import { cn } from '@/lib/utils'
import { useTranslation } from 'react-i18next'
import { v4 } from 'uuid'
import { Input } from '@/components'
import { useMediaQuery } from 'usehooks-ts'

export default function Contact(): React.JSX.Element {
    const { i18n } = useTranslation()
    const id = v4()
    const isTablet = useMediaQuery('(min-width: 768px)')
    const [name, setName] = React.useState('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <div
            className={cn(
                'flex flex-col gap-y-12 items-center justify-center w-full h-full p-4 md:p-24',
                'bg-gray dark:bg-primary'
            )}
        >
            <h1 className='text-4xl text-start w-full font-bold text-gray-900 dark:text-gray-100'>
                {i18n.language === 'tr' ? 'İletişim Formu' : 'Contact Form'}
            </h1>
            <form
                onSubmit={handleSubmit}
                className='flex flex-col gap-y-4 md:flex-row md:gap-x-4 items-center justify-center w-full md:h-96'
            >
                <div className='w-full md:w-1/2 h-full flex flex-col items-center justify-between gap-y-8 md:gap-y-8'>
                    <Input
                        type='name'
                        placeholder={i18n.language === 'en' ? 'Your Name' : 'Adınız'}
                        text={name}
                        setter={setName}
                    />
                    <Input type='text' placeholder={i18n.language === 'en' ? 'Your Surname' : 'Soyadınız'} />
                    <Input type='email' placeholder={i18n.language === 'en' ? 'Your Email' : 'E-posta Adresiniz'} />
                    <div className='w-full hidden md:flex flex-row gap-x-2 items-center justify-center'>
                        <button className='w-full px-4 py-2 rounded bg-primary dark:bg-gray text-white dark:text-primary font-bold text-lg'>
                            {i18n.language === 'tr' ? 'Gönder' : 'Send'}
                        </button>
                        <button className='w-full px-4 py-2 rounded bg-gray dark:bg-primary text-primary dark:text-white font-bold text-lg'>
                            {i18n.language === 'tr' ? 'Taslağı Kaydet' : 'Save Draft'}
                        </button>
                    </div>
                </div>
                <div className='w-full md:w-1/2 h-full flex items-center justify-center relative mt-4 md:mt-0'>
                    <textarea
                        id={id}
                        //value={value as string}
                        //onChange={onChange as (event: ChangeEvent<HTMLInputElement>) => void}
                        className={cn(
                            'w-full h-full placeholder:text-primary font-bold focus:outline-none peer placeholder-transparent resize-none   ',
                            { 'border-b-2 bg-transparent border-t-transparent border-x-transparent py-4': !isTablet },
                            {
                                ' border-2 border-t-primary dark:border-t-gray border-x-primary dark:border-x-gray rounded bg-gray dark:bg-primary p-4':
                                    isTablet,
                            }
                        )}
                    />
                    <label
                        htmlFor={id}
                        className={cn(
                            'absolute top-0 translate-x-2 left-0 py-2 pb-1 text-primary dark:text-white font-bold transition-all duration-300 peer-focus:text-xs peer-focus:top-0 peer-focus:-translate-y-5 peer-focus:bg-gray dark:peer-focus:bg-primary rounded',
                            { 'peer-focus:text-xs peer-focus:translate-x-0': !isTablet },
                            { 'peer-focus:text-sm peer-focus:translate-x-2 px-4': isTablet }
                        )}
                    >
                        {i18n.language === 'en' ? 'Message' : 'Mesaj'}
                    </label>
                </div>
                <div className='w-full flex md:hidden flex-col gap-y-2 items-center justify-center'>
                    <button className='w-full p-2 rounded bg-primary dark:bg-gray text-white dark:text-primary font-bold text-lg'>
                        Gönder
                    </button>
                    <button className='w-full p-2 rounded text-primary font-bold text-lg'>Taslağı Kaydet</button>
                </div>
            </form>
            <ul className='flex flex-col gap-y-2 md:flex-row md:gap-x-2 items-center justify-center'>
                <li className='text-lg font-bold italic px-2 rounded-sm cursor-pointer hover:bg-primary hover:text-white'>
                    Instagram
                </li>
                <li className='text-lg font-bold italic px-2 rounded-sm cursor-pointer hover:bg-primary hover:text-white'>
                    Facebook
                </li>
                <li className='text-lg font-bold italic px-2 rounded-sm cursor-pointer hover:bg-primary hover:text-white'>
                    Unsplash
                </li>
            </ul>
        </div>
    )
}
