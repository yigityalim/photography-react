import { gql } from 'graphql-request'

export const homePageQuery = gql`
    query Anasayfa {
      anasayfaPlural {
        id
        baslik
        aciklama
        kapakFotograflari {
          url
          width
          height
        }
        sosyalMedya {
          raw
        }
      }
    }
`
