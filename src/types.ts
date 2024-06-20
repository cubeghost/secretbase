import { ITEMS, BASES, CATEGORIES } from './constants';

export type ItemFilename = (typeof ITEMS)[number]['filename'];

export type BaseId = (typeof BASES)[number]['id'];
export type BaseType = (typeof BASES)[number]['type'];

export type Category = (typeof CATEGORIES)[number]['id'];

export interface Item {
    filename: ItemFilename;
    category: Category;
    size: [number, number];
    alt: string;
    unofficial?: boolean;
}

export interface ItemState {
    id: string,
    filename: ItemFilename,
    position: {
        top: number;
        left: number;
    },
    dropped: number;
}
