import { useCallback, useState, useMemo } from 'react';
import { DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import type { DndContextProps, DropAnimation, Modifier, DragStartEvent, DragEndEvent, KeyboardCoordinateGetter, DragCancelEvent, Announcements } from '@dnd-kit/core';

import { GRID_SIZE } from '../constants';
import { ItemFilename } from '../types';
import StaticItem from './StaticItem';

const createCustomSnapModifier = (): Modifier => {
  return ({ active, transform, over }) => {
    // TODO fix case where previously un-snapped items do not align
    const id = active?.data?.current?.id;
    const baseElement = document.getElementById('base');

    if (!baseElement) {
      return transform;
    }

    let x = (Math.ceil(transform.x / GRID_SIZE) * GRID_SIZE);
    let y = (Math.ceil(transform.y / GRID_SIZE) * GRID_SIZE);

    const baseRect = over ? over.rect : baseElement.getBoundingClientRect();

    if (active && !id) {
      const sourceItemRect = active.rect.current.initial;
      if (sourceItemRect) {
        let itemTopOffset = (sourceItemRect.top - baseRect.top) % GRID_SIZE;
        let itemLeftOffset = (sourceItemRect.left - baseRect.left) % GRID_SIZE;
        if (itemTopOffset > (GRID_SIZE / 2)) {
          itemTopOffset = itemTopOffset - GRID_SIZE;
        }
        if (itemLeftOffset > (GRID_SIZE / 2)) {
          itemLeftOffset = itemLeftOffset - GRID_SIZE;
        }

        x -= itemLeftOffset;
        y -= itemTopOffset;
      }
    }

    return {
      ...transform,
      x,
      y,
    };
  };
}

const snapModifier = createCustomSnapModifier();

const customCoordinatesGetter: KeyboardCoordinateGetter = (event, { currentCoordinates, context }) => {
  switch (event.key) {
    case 'ArrowRight':
    case 'd':
      return { ...currentCoordinates, x: currentCoordinates.x + GRID_SIZE };
    case 'ArrowLeft':
    case 'a':
      return { ...currentCoordinates, x: currentCoordinates.x - GRID_SIZE };
    case 'ArrowDown':
    case 's':
      return { ...currentCoordinates, y: currentCoordinates.y + GRID_SIZE };
    case 'ArrowUp':
    case 'w':
      return { ...currentCoordinates, y: currentCoordinates.y - GRID_SIZE };
    case 'j':
      const baseRect = context.droppableRects.get('base');
      if (baseRect) {
        return { x: baseRect.left, y: baseRect.top };
      } else {
        return currentCoordinates;
      }
  }

  return undefined;
};

const announcements: Announcements = {
  onDragStart({ active }) {
    const item = active.data?.current?.alt || active.id;
    return `Picked up draggable item ${item}.`;
  },
  onDragOver({ active, over }) {
    const item = active.data?.current?.alt || active.id;

    if (over) {
      return `Draggable item ${item} was moved over droppable area ${over.id}.`;
    }

    return `Draggable item ${item} is no longer over a droppable area.`;
  },
  onDragEnd({ active, over }) {
    const item = active.data?.current?.alt || active.id;

    if (over) {
      return `Draggable item ${item} was dropped over droppable area ${over.id}`;
    }

    return `Draggable item ${item} was dropped.`;
  },
  onDragCancel({ active }) {
    const item = active.data?.current?.alt || active.id;
    return `Dragging was cancelled. Draggable item ${item} was dropped.`;
  },
};

interface CustomDndProps extends DndContextProps {
  enableSnapToGrid: boolean;
  dropAnimation: DropAnimation;
}

const CustomDndContext = ({
  enableSnapToGrid,
  dropAnimation,
  onDragStart: parentOnDragStart,
  onDragCancel: parentOnDragCancel,
  onDragEnd: parentOnDragEnd,
  children,
  ...props
}: CustomDndProps) => {
  const [draggingItem, setDraggingItem] = useState<ItemFilename | null>(null);

  const modifiers = useMemo(() => (
    enableSnapToGrid ? [snapModifier] : []
  ), [enableSnapToGrid]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: customCoordinatesGetter,
    })
  );

  const onDragStart = useCallback((event: DragStartEvent) => {
    setDraggingItem(event.active.data?.current?.filename);
    parentOnDragStart?.(event);
  }, [parentOnDragStart]);

  const onDragCancel = useCallback((event: DragCancelEvent) => {
    setDraggingItem(null);
    parentOnDragCancel?.(event);
  }, [parentOnDragCancel]);

  const onDragEnd = useCallback((event: DragEndEvent) => {
    setDraggingItem(null);
    parentOnDragEnd?.(event);
  }, [parentOnDragEnd]);

  return (
    <DndContext
      modifiers={modifiers}
      sensors={sensors}
      accessibility={{
        announcements,
      }}
      onDragStart={onDragStart}
      onDragCancel={onDragCancel}
      onDragEnd={onDragEnd}
      {...props}
    >
      {children}
      <DragOverlay dropAnimation={dropAnimation} transition="">
        {draggingItem && (
          <div style={{ cursor: 'move' }}>
            <StaticItem filename={draggingItem} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

export default CustomDndContext;