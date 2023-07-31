import { gql } from 'graphql-request'
export const albumBySlug = gql`
query getWeddingsBySlug($slug: String!) {
  album(where: {slug: $slug}) {
    baslik
    slug
    cekimTarihi
    konum
    resimler(last: 100) {
      url
      width
      height
    }
  }
}

`