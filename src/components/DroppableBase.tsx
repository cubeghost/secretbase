import React, { forwardRef, useCallback, useMemo } from "react";
import { useDroppable } from '@dnd-kit/core';

import StaticBase from "./StaticBase";
import type { BaseProps } from "./StaticBase";
import { BASE_MAP } from "../constants";

type DroppableBaseProps = Omit<BaseProps, 'alt'>;

const DroppableBase = forwardRef(({ id }: DroppableBaseProps, ref) => {
  const { label } = useMemo(() => BASE_MAP.get(id)!, [id]);

  const { setNodeRef } = useDroppable({
    id: 'base',
    data: {
      id,
      alt: label
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
      <StaticBase id={id} alt={label} />
    </div>
  );
});

export default React.memo(DroppableBase);