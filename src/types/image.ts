export type Image = {
    baslik: string
    slug: string
    tarih: string
    konum: string
    tip: string
    resimler: {
        url: string
        width: number
        height: number
    }[]
}