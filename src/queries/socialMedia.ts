import { gql } from 'graphql-request'


export const getSocialMedia = gql`
    query getSocialMedia {
      social(where: {
        id: "clmvudn2l8ak00bwbfar28dxk"
      }) {
        id
        facebookUrl
        twitterUrl
        youTubeUrl
      }
    }
`