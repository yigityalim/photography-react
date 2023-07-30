import { useQuery, UseQueryResult } from 'react-query'
import { GraphQLClient } from 'graphql-request';
import { weddings as weddingQuery } from '@/queries'
import type { Wedding } from '@/types'

const graphQLClient = new GraphQLClient(import.meta.env.VITE_GRAPHCMS_URL);

export function useWeddings(): UseQueryResult<Wedding[]> {
    return useQuery<Wedding[]>('get-weddings', async () => {
        const {weddings} = await graphQLClient.request<never>(weddingQuery);
        return weddings;
    })
}