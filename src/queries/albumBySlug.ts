import { gql } from 'graphql-request'

export const albumBySlug = gql`
query AblumByTip( $tip: Tip! ) {
  albums(where: { tip: $tip }) {
    baslik
    slug
    tarih
    konum
    tip
    kapakFotografi { url width height }
  }
}
`