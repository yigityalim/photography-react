export type SocialMedia = {
    raw: {
        children: {
            type: string
            children: {
                text: string
            }[]
        }[]
    }
}