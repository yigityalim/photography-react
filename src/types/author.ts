import { Wedding } from '@/types'

export type Author = {
    id: string;
    name: string;
    intro: string;
    bio: string;
    slug: string;
    picture: {
        url: string;
    },
    weddings: Wedding[];
}