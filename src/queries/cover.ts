import { gql } from 'graphql-request'


export const cover = gql`
query kapak {
  kapakPrual {
    id
    baslik
    slug
    kapakFotografi {
      url
      width
      height
    }
  }
}
`