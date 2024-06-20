import { useMemo } from 'react';
import { useDraggable } from '@dnd-kit/core';
import type { ItemFilename } from '../types';
import { ITEMS_MAP } from '../constants';

interface ItemProps {
  filename: ItemFilename;
  alt?: string;
}

export const StaticItem = ({ filename, alt }: ItemProps) => (
  <img
    src={`https://secretbase.cubegho.st/assets/items/${filename}`}
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