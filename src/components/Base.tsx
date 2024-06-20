import { forwardRef, useCallback } from "react";
import { useDroppable } from '@dnd-kit/core';

import type { BaseId } from '../types';

interface BaseProps {
  id: BaseId;
}

const StaticBase = ({ id }: BaseProps) => (
  <img src={`https://secretbase.cubegho.st/assets/bases/${id}.png`} className="util-pixelated" style={{ display: 'block' }} />
);

const DroppableBase = forwardRef(({ id }: BaseProps, ref) => {
  const { setNodeRef } = useDroppable({
    id: 'base',
    data: {
      id
    }
  });

  const setRef = useCallback((element: HTMLElement | null) => {
    setNodeRef(element);
    if (ref) {
      ref.current = element;
    }
  }, [setNodeRef, ref]);

  return (
    <div id="base" ref={setRef} style={{ zIndex: '-1' }}>
      <StaticBase id={id} />
    </div>
  );
});

export default DroppableBase;