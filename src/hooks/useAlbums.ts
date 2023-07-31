import { useQuery, UseQueryResult } from 'react-query'
import { albums as albumsQuery } from '@/queries'
import type { Album } from '@/types'
import { graphQLClient } from '@/hooks'

export function useAlbums(): UseQueryResult<Album[]> {
    return useQuery<Album[]>('get-albums', async (): Promise<Album[]> => {
        const {albums} = await graphQLClient.request<never>(albumsQuery);
        if (!albums) throw new Error('No albums found');
        return albums;
    })
}