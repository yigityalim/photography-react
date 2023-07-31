import { useQuery, UseQueryResult } from 'react-query'
import { getAuthor } from '@/queries';
import type { Author } from '@/types';
import { graphQLClient } from '@/hooks/graphql.ts'


export function useAuthor(): UseQueryResult<Author> {
    return useQuery<Author>('get-author', async () => {
        const {author} = await graphQLClient.request<never>(getAuthor);
        return author;
    })
}