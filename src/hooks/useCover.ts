import { useQuery, useQueryClient, UseQueryResult } from 'react-query'
import { cover as coverQuery } from '@/queries'
import type { Cover } from '@/types'
import { graphQLClient } from '@/hooks'
import { useEffect } from 'react'

export function useCover(): UseQueryResult<Cover[]> {
    const queryKey = 'get-cover';
    const queryClient = useQueryClient();
    const queryResult = useQuery<Cover[]>(queryKey, async (): Promise<Cover[]> => {
        const { kapakPrual } = await graphQLClient.request<never>(coverQuery);
        if (!kapakPrual) throw new Error('No cover found');
        return kapakPrual;
    });

    useEffect(() => {
        return () => {
            queryClient.removeQueries(queryKey);
        };
    }, []);

    return queryResult;
}