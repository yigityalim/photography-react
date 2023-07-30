import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function Register(): React.JSX.Element {

    const { i18n } = useTranslation()


    const navigate = useNavigate()
    const [email, setEmail] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')
/*
    if (loading)  return <Loader fullHeight={true} />
    if (error) return <div>Error</div>

    if (user) return <Navigate to='/admin' />

 */

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            navigate('/admin')
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className='flex flex-col items-center justify-center w-full h-full'>
            <form onSubmit={handleLogin} className='w-full flex flex-col gap-y-4 items-center justify-center'>
                <h1 className='text-2xl font-bold text-start w-full text-blue-500'>
                    {i18n.language === 'tr' ? 'Kayıt Ol' : 'Register'}
                </h1>
                <input
                    type='email'
                    placeholder='Email'
                    className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type='password'
                    placeholder='Password'
                    className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type='submit'
                    className='w-full p-2 bg-blue-400 text-white rounded-md focus:outline-none'
                >
                    {i18n.language === 'tr' ? 'Kayıt Ol' : 'Register'}
                </button>
                <Link to='/admin/login'
                      className='px-4 py-2 mt-12 text-sm text-blue-500 border border-blue-500 rounded-md w-full text-center'>
                    {i18n.language === 'tr' ? 'Giriş Yap' : 'Login'}
                </Link>
            </form>
        </div>
    )
}