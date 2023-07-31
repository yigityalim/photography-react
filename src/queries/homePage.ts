import { gql } from 'graphql-request'

export const homePageQuery = gql`
    query HomePageQuery {
        homePage {
            cover {
                url
                width
                height
            }
        }
    }
`
