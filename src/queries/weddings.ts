import { gql } from 'graphql-request'


export const weddings = gql`
    query getWeddingsByAuthor {
      weddings {
        title
        slug
        date
        coverPhoto {
          url
          width
          height
        }
      }
    }
`