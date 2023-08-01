export type Cover = {
    id: string
    baslik: string
    slug: string
    tip: 'dugun' | 'nisan' | 'ozelGun' | 'dogumGunu'
    tarih: string
    konum: string
    kapakFotografi: {
        url: string
        width: number
        height: number
    }
    resimler: {
        url: string
        width: number
        height: number
    }[]
}