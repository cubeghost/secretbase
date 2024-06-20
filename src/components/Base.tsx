import { forwardRef, useCallback } from "react";
import { useDroppable } from '@dnd-kit/core';

import type { BaseId } from '../types';

interface BaseProps {
  id: BaseId;
}

export const StaticBase = ({ id }: BaseProps) => (
  <img src={`https://secretbase.cubegho.st/assets/bases/${id}.png`} className="util-pixelated" style={{ display: 'block' }} />
);

export const DroppableBase = forwardRef(({ id }: BaseProps, ref) => {
  const { setNodeRef } = useDroppable({
    id: 'base',
    data: {
      id
    }
  });

  const setRef = useCallback((element: HTMLElement | null) => {
    setNodeRef(element);
    if (ref) {
      // @ts-expect-error
      ref.current = element;
    }
  }, [setNodeRef, ref]);

  return (
    <div id="base" ref={setRef} style={{ zIndex: '-1' }}>
      <StaticBase id={id} />
    </div>
  );
});