import React from 'react'
import { Trans } from 'react-i18next'
import { RouterProvider } from 'react-router-dom'
import router from '@/Routes'
import { Loader } from '@/components'

export default function App(): React.JSX.Element {
    return (
        <Trans>
            <RouterProvider fallbackElement={<Loader />} router={router} />
        </Trans>
    )
}
