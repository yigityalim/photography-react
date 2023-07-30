
export type Wedding = {
    id : string
    title : string
    slug : string
    isVideo : boolean
    date : string
    coverPhoto: {
        url : string
    }
    images: Image[]
}

type Image = {
    url : string
    width : number
    height : number
}