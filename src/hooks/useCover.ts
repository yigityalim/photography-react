import { useQuery, UseQueryResult } from 'react-query'
import { cover as coverQuery } from '@/queries'
import type { Cover } from '@/types'
import { graphQLClient } from '@/hooks'

export function useCover(): UseQueryResult<Cover[]> {
    return useQuery<Cover[]>('get-cover', async (): Promise<Cover[]> => {
        const {kapakPrual} = await graphQLClient.request<never>(coverQuery);
        if (!kapakPrual) throw new Error('No cover found');
        return kapakPrual;
    })
}