import { forwardRef, useCallback } from "react";
import { useDroppable } from '@dnd-kit/core';

import type { BaseId } from '../types';
import { ASSET_BASE } from "../constants";

interface BaseProps {
  id: BaseId;
}

export const StaticBase = ({ id }: BaseProps) => (
  <img src={`${ASSET_BASE}assets/bases/${id}.png`} className="util-pixelated util-block" />
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
    <div id="base" className="base-droppable" ref={setRef}>
      <StaticBase id={id} />
    </div>
  );
});