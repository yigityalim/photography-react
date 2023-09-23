import { gql } from 'graphql-request'

export const homePageQuery = gql`
    query Anasayfa {
      anasayfas {
        id
        baslik
        aciklama
        kapakFotograflari {
          url
          width
          height
        }
        sosyalMedya 
      }
    }
`
