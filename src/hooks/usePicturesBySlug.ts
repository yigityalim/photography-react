import { useQuery, UseQueryResult } from 'react-query'
import type { Image } from '@/types'
import { graphQLClient } from '@/hooks'
import { imageBySlug } from '@/queries/'
import { useEffect } from 'react'

export function usePicturesBySlug(slug: string | undefined): UseQueryResult<Image> {
    const queryKey: (string | undefined)[] = ['get-wedding-by-slug', slug];
    const queryResult: UseQueryResult<Image> = useQuery<Image>(queryKey, async (): Promise<Image> => {
        const { album } = await graphQLClient.request<never>(imageBySlug, {
            slug
        });
        return album;
    });

    useEffect(() => {
        return () => {
            queryResult.remove();
        };
    }, []);

    return queryResult;
}



