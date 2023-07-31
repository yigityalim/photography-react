import { useQuery, UseQueryResult } from 'react-query'
import { albumBySlug } from '@/queries'
import type { Album } from '@/types'
import { graphQLClient } from '@/hooks'

export function useAlbumBySlug(slug: string): UseQueryResult<Album> {
    return useQuery<Album>('get-wedding-by-slug', async (): Promise<Album> => {
        const { album } = await graphQLClient.request<never>(albumBySlug, {
            slug,
        })
        return album
    })
}