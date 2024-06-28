import React, { forwardRef, useCallback } from "react";
import { useDroppable } from '@dnd-kit/core';

import StaticBase from "./StaticBase";
import type { BaseProps } from "./StaticBase";

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
      // @ts-expect-error
      ref.current = element;
    }
  }, [setNodeRef, ref]);

  return (
    <div id="base" className="base-droppable" ref={setRef}>
      <StaticBase id={id} />
    </div>
  );
});

export default React.memo(DroppableBase);