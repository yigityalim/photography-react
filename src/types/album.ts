
export type Album = {
    id : string
    sec: 'dugun' | 'nisan' | 'dogumGunu' | 'ozelGun'
    baslik : string
    slug : string
    isVideo : boolean
    cekimTarihi : string
    kapakFotografi: {
        url : string
        width : number
        height : number
    }
    konum : string
    resimler: Image[]
}

type Image = {
    url : string
    width : number
    height : number
}