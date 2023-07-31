import { gql } from 'graphql-request'


export const albums = gql`
    query getWeddings {
      albums {
        baslik
        slug
        sec
        cekimTarihi
        kapakFotografi {
          url
          width
          height
        }
        konum
      }
    }
`