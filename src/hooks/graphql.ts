import { GraphQLClient } from 'graphql-request'
export const graphQLClient: GraphQLClient = new GraphQLClient(import.meta.env.VITE_GRAPHCMS_URL);