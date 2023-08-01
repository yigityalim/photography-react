import { gql } from 'graphql-request'

export const albumBySlug = gql`
query AblumByTip( $tip: Tip! ) {
  albumPlural(where: { tip: $tip }) {
    baslik
    slug
    tarih
    konum
    tip
    kapakFotografi { url width height }
  }
}
`