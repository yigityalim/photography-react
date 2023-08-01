
export type MenuType = {
    id: number;
    name: string;
    href: string;
    icon: string;
    children?: {
        id: number
    }[] | null;
}

export const menu: MenuType[] = [
    {
        id: 1,
        name: 'home',
        href: '/',
        icon: 'home',
    },
    {
        id: 2,
        name: 'Albümler',
        href: '/albums',
        icon: 'gallery_thumbnail',
        children: [
            {
                id: 1,
            }
        ],
    },
    {
        id: 3,
        name: 'Hakkımda',
        href: '/contact',
        icon: 'person',
    },
]