import { useQuery, useQueryClient, UseQueryResult } from 'react-query'
import { homePageQuery } from '@/queries'
import { graphQLClient } from '@/hooks'
import { useEffect } from 'react'
import { Home } from '@/types'

export function useHome(): UseQueryResult<Home[]> {
    const queryKey = 'get-home';
    const queryClient = useQueryClient();
    const queryResult = useQuery<Home[]>(queryKey, async (): Promise<Home[]> => {
        const { anasayfas } = await graphQLClient.request<never>(homePageQuery);
        if (!anasayfas) throw new Error('No home data found');
        return anasayfas;
    });

    useEffect(() => {
        return () => {
            queryClient.removeQueries(queryKey);
        };
    }, []);

    return queryResult;
}