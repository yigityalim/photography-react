import { useQuery, UseQueryResult } from 'react-query'
import { GraphQLClient } from 'graphql-request';
import { getAuthor } from '@/queries';
import type { Author } from '@/types';

const graphQLClient = new GraphQLClient(import.meta.env.VITE_GRAPHCMS_URL);

export function useAuthor(): UseQueryResult<Author> {
    return useQuery<Author>('get-author', async () => {
        const {author} = await graphQLClient.request<never>(getAuthor);
        return author;
    })
}