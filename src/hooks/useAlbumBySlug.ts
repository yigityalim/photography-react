import { useQuery, UseQueryResult, useQueryClient } from 'react-query'
import { albumBySlug } from '@/queries'
import type { Cover } from '@/types'
import { graphQLClient } from '@/hooks'
import { useEffect } from 'react';

export function useAlbumBySlug(tip: string | undefined = 'dugun'): UseQueryResult<Cover[]> {
    const queryKey = ['get-wedding-by-slug', tip];
    const queryClient = useQueryClient();

    useEffect(() => {
        return () => {
            queryClient.removeQueries(queryKey);
        };
    }, []);

    return useQuery<Cover[]>(queryKey, async (): Promise<Cover[]> => {
        const { albumPlural } = await graphQLClient.request<never>(albumBySlug, {
            tip
        });
        return albumPlural;
    });
}