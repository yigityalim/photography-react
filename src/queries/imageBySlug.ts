import { gql } from 'graphql-request'

export const imageBySlug = gql`
    query AblumBySLlug($slug: String!) {
      album(where: {slug: $slug}) {
        baslik
        slug
        tarih
        konum
        tip
        resimler(first: 100) {
          url
          width
          height
        }
      }
    }

`