import { gql } from 'graphql-request'

export const getAuthor = gql`
    query getAuthor {
      author(where: {id: "ckwgh4bw83ec40a65sg9fw1dy"}) {
        id
        name
        intro
        bio
        slug
        picture {
          id
          url
        }
      }
    }
`