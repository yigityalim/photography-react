
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
        name: 'Düğünler',
        href: '/albums',
        icon: 'gallery_thumbnail',
    },
    {
        id: 3,
        name: 'Hakkımda',
        href: '/contact',
        icon: 'person',
    },
]