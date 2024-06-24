import { useMemo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { BaseType, ItemFilename } from '../types';
import { ASSET_BASE, BASE_TYPES, ITEMS_MAP } from '../constants';

interface ItemProps {
  filename: ItemFilename | (typeof BASE_TYPES)[BaseType]['landscape_item'];
  alt?: string;
}

export const StaticItem = ({ filename, alt }: ItemProps) => (
  <img
    src={`${ASSET_BASE}assets/items/${filename}`}
    alt={alt}
    className="item-image util-pixelated"
  />
);

interface DraggableItemProps {
  id?: string;
  filename: ItemFilename;
  style: React.CSSProperties;
}

export const DraggableItem = ({ id, filename, style }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: id ? `item-${id}` : `item-${filename}`,
    data: {
      id,
      filename,
    }
  });

  const dragStyle = useMemo(() => (isDragging ? {
    opacity: id ? 0 : 1,
  } : {}), [isDragging, id]);

  const { alt, size } = useMemo(() => ITEMS_MAP.get(filename)!, [filename]);

  const sizeStyle = useMemo(() => ({
    '--tile-width': size[0],
    '--tile-height': size[1]
  }), [size]);

  return (
    <div
      ref={setNodeRef}
      className="item"
      style={{ ...style, ...dragStyle, ...sizeStyle }}
      {...listeners}
      {...attributes}
    >
      <StaticItem filename={filename} alt={alt} />
    </div>
  );
}
