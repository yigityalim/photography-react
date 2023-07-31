import { useQuery, UseQueryResult } from 'react-query'
import { homePageQuery } from '@/queries'
import { HomePageType } from '@/types'
import { graphQLClient } from '@/hooks'

export function useHomePageCover(): UseQueryResult<HomePageType[]> {
    return useQuery<HomePageType[]>('get-home-page-images', async () => {
        const { weddings } = await graphQLClient.request<never>(homePageQuery)
        return weddings
    })
}