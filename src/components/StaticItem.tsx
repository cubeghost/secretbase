import React from 'react';
import type { BaseType, ItemFilename } from '../types';
import { ASSET_BASE, BASE_TYPES } from '../constants';

export interface ItemProps {
  filename: ItemFilename | (typeof BASE_TYPES)[BaseType]['landscape_item'];
  alt?: string;
}

const StaticItem = ({ filename, alt }: ItemProps) => (
  <img
    src={`${ASSET_BASE}assets/items/${filename}`}
    alt={alt}
    className="item-image util-pixelated"
  />
);

export default React.memo(StaticItem);