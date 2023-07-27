
export type MenuType = {
    id: number;
    name: string;
    href: string;
    icon: string;
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
        name: 'images',
        href: '/images',
        icon: 'gallery_thumbnail',
    },
    {
        id: 3,
        name: 'portfolio',
        href: '/portfolio',
        icon: 'person',
    },
]