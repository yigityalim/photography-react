import { useQuery, UseQueryResult } from 'react-query'
import { GraphQLClient } from 'graphql-request'
import { getSocialMedia } from '@/queries'
import type { SocialMedia } from '@/types'

const graphQLClient = new GraphQLClient(import.meta.env.VITE_GRAPHCMS_URL)

export function useSocialMedia(): UseQueryResult<SocialMedia> {
    return useQuery<SocialMedia>('get-social-media', async () => {
        const { socialMedia } = await graphQLClient.request<never>(getSocialMedia)
        return socialMedia
    })
}