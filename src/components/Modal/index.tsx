import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Button } from '@/components'

type ModalProps = {
    title: string
    children: React.ReactNode
}

export function Modal({ title, children, }: ModalProps): React.JSX.Element {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <>
            <Button variant='link' onClick={() => setIsOpen(true)}>Open Modal</Button>

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
    <div className='fixed inset-0 bg-black bg-opacity-20 dark:bg-opacity-10 backdrop-saturate-200 backdrop-blur-md dark:backdrop-blur-lg' />
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
        className='w-full max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl transform overflow-hidden rounded bg-white dark:bg-primary p-6 text-left align-middle shadow-xl transition-all'>
    <Dialog.Title
        as='h1'
    className='text-xl font-bold leading-6 text-secondary dark:text-white w-full flex items-center justify-between'
        >
        {title}
        <Button variant='link' onClick={() => setIsOpen(false)}>
    <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24'
    stroke='currentColor'>
    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2}
    d='M6 18L18 6M6 6l12 12' />
        </svg>
        </Button>
        </Dialog.Title>
        <div className='mt-2 flex flex-col gap-y-4'>
        {children}
        </div>
        </Dialog.Panel>
        </Transition.Child>
        </div>
        </div>
        </Dialog>
        </Transition>
        </>
)
}