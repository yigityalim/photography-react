import { gql } from 'graphql-request'

export const imageBySlug = gql`
    query AblumBySLlug($slug: String!) {
      album(where: {slug: $slug}) {
        baslik
        slug
        tarih
        konum
        tip
        resimler {
          url
          width
          height
        }
      }
    }

`