import { useQuery, UseQueryResult } from 'react-query'
import { GraphQLClient } from 'graphql-request'
import { getWeddingsBySlug } from '@/queries'
import type { Wedding} from '@/types'

const graphQLClient = new GraphQLClient(import.meta.env.VITE_GRAPHCMS_URL)

export function useWeddingsBySlug(slug: string): UseQueryResult<Wedding[]> {
    return useQuery<Wedding[]>('get-wedding-by-slug', async () => {
        const { weddings } = await graphQLClient.request<never>(getWeddingsBySlug, {
            slug
        })
        return weddings
    })
}