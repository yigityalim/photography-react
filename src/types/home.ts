import { SocialMedia } from '@/types'

export type Home = {
    id: string;
    baslik: string
    aciklama: string
    kapakFotograflari: {
        url: string
        width: number
        height: number
    }[]
    sosyalMedya: SocialMedia
}
