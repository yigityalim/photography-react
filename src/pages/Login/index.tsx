import React from 'react'
import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Loader } from '@/components'

export default function Login(): React.JSX.Element {

    const { i18n } = useTranslation()
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        <div className='flex flex-col items-center justify-center w-full h-full'>
            <form onSubmit={handleLogin} className='w-full flex flex-col gap-y-4 items-center justify-center'>
                <h1 className='text-2xl font-bold text-start w-full text-blue-500'>
                    {i18n.language === 'tr' ? 'Giriş Yap' : 'Login'}
                </h1>
                <input
                    type='email'
                    placeholder='Email'
                    className='w-full p-2 border border-gray-300 dark:bg-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    className='w-full p-2 border border-gray-300 dark:bg-secondary rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type='submit'
                    className='w-full p-2 bg-blue-400 text-white rounded-md focus:outline-none'
                >
                    {i18n.language === 'tr' ? 'Giriş Yap' : 'Login'}
                </button>
                {/*
                <Link to='/admin/register'
                      className='px-4 py-2 mt-12 text-sm text-blue-500 border border-blue-500 rounded-md w-full text-center'>
                    {i18n.language === 'tr' ? 'Kayıt Ol' : 'Register'}
                </Link>
                */}
            </form>
        </div>
    )
}