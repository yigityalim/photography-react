import { useQuery, UseQueryResult } from 'react-query'
import { getSocialMedia } from '@/queries'
import type { SocialMedia } from '@/types'
import { graphQLClient } from '@/hooks'

export function useSocialMedia(): UseQueryResult<SocialMedia> {
    return useQuery<SocialMedia>('get-social-media', async () => {
        const { socialMedia } = await graphQLClient.request<never>(getSocialMedia)
        return socialMedia
    })
}