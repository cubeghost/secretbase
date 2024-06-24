import { ITEMS, BASES, CATEGORIES } from './constants';

export type ItemFilename = (typeof ITEMS)[number]['filename'];

export type BaseId = (typeof BASES)[number]['id'];
export type BaseType = (typeof BASES)[number]['type'];

export type Category = (typeof CATEGORIES)[number]['id'];

export interface BaseDefaultItemLocations {
  laptop: [number, number];
  gap: Array<[number, number]>;
  landscape: Array<[number, number]>;
}

export type Base = (typeof BASES)[number];

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

export const SAVE_DATA_BOOLEAN_KEYS = ['enableSnapToGrid', 'enableDefaultLaptop', 'enableDefaultLandscape', 'enableUnofficialItems'] as const;
export type SaveDataBooleanKey = (typeof SAVE_DATA_BOOLEAN_KEYS)[number];
type BooleanProperties<Keys extends PropertyKey> = {
  [Key in Keys]: boolean;
};

export type SaveData = {
  base: BaseId;
  items: Record<string, ItemState>;
} & BooleanProperties<SaveDataBooleanKey>;

export interface MinimalSaveData extends Omit<SaveData, 'items' | 'base'> {
  base: BaseIdWithoutPrefix<BaseId>;
  items: Array<[ItemFilename, [number, number]]>;
}

type Digit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0';
type TwoDigits = `${Digit}${Digit}`;

export type BaseIdWithoutPrefix<T extends `base_${TwoDigits}`> = T extends `base_${infer D extends TwoDigits}` ? D : never;
