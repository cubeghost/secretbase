import React, { useMemo } from 'react';
import { useDraggable } from '@dnd-kit/core';

import type { ItemFilename } from '../types';
import { ITEMS_MAP } from '../constants';
import StaticItem from './StaticItem';

interface DraggableItemProps {
  id?: string;
  filename: ItemFilename;
  style: React.CSSProperties;
}

const DraggableItem = ({ id, filename, style }: DraggableItemProps) => {
  const { alt, size } = useMemo(() => ITEMS_MAP.get(filename)!, [filename]);

  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: id ? `item-${id}` : `item-${filename}`,
    data: {
      id,
      filename,
      alt,
    }
  });

  const dragStyle = useMemo(() => (isDragging ? {
    opacity: id ? 0 : 1,
  } : {}), [isDragging, id]);

  const sizeStyle = useMemo(() => ({
    '--tile-width': size[0],
    '--tile-height': size[1]
  }), [size]);

  return (
    <button
      ref={setNodeRef}
      className="item"
      style={{ ...style, ...dragStyle, ...sizeStyle }}
      {...listeners}
      {...attributes}
    >
      <StaticItem filename={filename} alt={alt} />
    </button>
  );
};

export default React.memo(DraggableItem);