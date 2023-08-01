import { useQuery, UseQueryResult } from 'react-query'
import { albumBySlug } from '@/queries'
import type { Cover } from '@/types'
import { graphQLClient } from '@/hooks'

export function usePicturesBySlug(tip: string | undefined = 'dugun'): UseQueryResult<Cover[]> {
    return useQuery<Cover[]>('get-wedding-by-slug', async (): Promise<Cover[]> => {
        const { albumPlural } = await graphQLClient.request<never>(albumBySlug, {
            tip
        })
        return albumPlural
    })
}