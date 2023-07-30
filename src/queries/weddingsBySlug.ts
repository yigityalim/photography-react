import { gql } from 'graphql-request'
export const getWeddingsBySlug = gql`
query getWeddingsBySlug($slug: String!) {
  weddings(where: {slug: $slug}) {
    id
    title
    slug
    date
    isVideo
    images {
      url
      width
      height
    }
  }
}

`