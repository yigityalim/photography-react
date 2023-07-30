import { gql } from 'graphql-request'


export const getSocialMedia = gql`
    query getSocialMedia {
      social(where: {
        id: "ckxj6dmpcgi2t0b05d096vamn"
      }) {
        id
        facebookUrl
        twitterUrl
        youTubeUrl
      }
    }
`