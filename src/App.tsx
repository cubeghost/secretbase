import { useCallback, useState, useMemo, useRef } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import type { Modifier, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import { customAlphabet } from 'nanoid'
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';
// @ts-expect-error
import download from 'downloadjs';

import { StaticItem, DraggableItem } from './components/Item';
import ItemPicker from './components/ItemPicker';
import { DroppableBase } from './components/Base';
import BasePicker from './components/BasePicker';
import Music from './components/Music';

import { GRID_SIZE, POOF_DURATION } from './constants';
import type { ItemState, BaseId, ItemFilename } from './types';
import { BASE_DIMENSIONS } from 'virtual:base-dimensions';

const MIN_PICKER_WIDTH = 280;

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz0123456789', 12);

function createCustomSnapModifier(): Modifier {
  return ({ active, transform, over }) => {
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
        // console.log({itemTopOffset, itemLeftOffset})

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


function App() {
  const [base, setBase] = useState<BaseId>('base_0005_6');
  const [items, setItems] = useState<Record<string, ItemState>>({});
  const [draggingItem, setDraggingItem] = useState<ItemFilename | null>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const poofItemId = useRef<string | null>(null);

  const [enableSnapToGrid, setSnapToGrid] = useState(true);
  const [isSaving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<Error | null>();

  const [showGrid, setShowGrid] = useState(false);
  const [showOutlines, setShowOutlines] = useState(false);

  const sortedItems = useMemo(() =>
    Object.values(items).sort((a, b) => a.dropped - b.dropped)
    , [items]);

  const clear = useCallback(() => {
    setItems({});
  }, []);

  const save = useCallback(async () => {
    setSaving(true);
    try {
      const response = await fetch('/.netlify/functions/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          base,
          items: sortedItems
        })
      });

      if (!response.ok) {
        const message = await response.text();
        throw Error(message);
      }

      const blob = await response.blob();
      download(blob, `secretbase_${nanoid(8)}.png`);
      setSaving(false);
      setSaveError(null);
    } catch (error) {
      console.error(error);
      setSaving(false);
      setSaveError(error as Error);
    }
  }, [base, sortedItems]);

  const modifiers = useMemo(() => (
    enableSnapToGrid ? [snapModifier] : []
  ), [enableSnapToGrid]);

  const onDragStart = useCallback((event: DragStartEvent) => {
    setDraggingItem(event.active.data?.current?.filename);
  }, []);

  const onDragCancel = useCallback(() => {
    setDraggingItem(null);
  }, []);

  const onDragEnd = useCallback((event: DragEndEvent) => {
    setDraggingItem(null);

    const { id, filename } = event.active.data.current || {};
    const overBase = event?.over?.id === 'base';

    const itemRect = event.active.rect.current.translated;
    if (!itemRect || !baseRef.current) {
      throw new Error(`Can't get relative position of dropped item`);
    }
    const baseRect = baseRef.current.getBoundingClientRect();
    const position = {
      top: itemRect.top - baseRect.top,
      left: itemRect.left - baseRect.left
    };

    if (id) {
      setItems(prev => ({
        ...prev,
        [id]: {
          ...prev[id],
          position,
          dropped: Date.now()
        }
      }));

      if (!overBase) {
        poofItemId.current = id;

        setTimeout(() => {
          poofItemId.current = null;
          setItems(prev => {
            const state = { ...prev };
            Reflect.deleteProperty(state, id);
            return state;
          });
        }, POOF_DURATION);
      }
    } else if (overBase) {
      const newId = nanoid();
      setItems(prev => ({
        ...prev,
        [newId]: {
          id: newId,
          filename,
          position,
          dropped: Date.now()
        }
      }));
    }
  }, []);

  const cssVariables = useMemo(() => {
    const [width, height] = BASE_DIMENSIONS[base];
    return {
      '--grid-size': `${GRID_SIZE}px`,
      '--base-tile-width': width / GRID_SIZE,
      '--base-tile-height': height / GRID_SIZE,
      '--poof-duration': `${POOF_DURATION}ms`,
    } as React.CSSProperties;
  }, [base]);

  const query = useMemo(() => {
    const [width] = BASE_DIMENSIONS[base];
    // margin + picker + gutter + base + margin
    const minWidth = GRID_SIZE + MIN_PICKER_WIDTH + GRID_SIZE + width + GRID_SIZE;
    return `(max-width: ${minWidth}px)`;
  }, [base]);

  const isMobile = useMediaQuery({ query });

  return (
    <DndContext
      modifiers={modifiers}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <div className={clsx('grid', { mobile: isMobile })} style={cssVariables}>
        <div className="options with-border">
          <div>
            <h3>Options</h3>
            <label style={{ display: 'block' }}>
              <input
                type="checkbox"
                checked={enableSnapToGrid}
                onChange={(event) => setSnapToGrid(event.target.checked)}
              /> 
              Snap to grid
            </label>
            <Music />
          </div>
          <div style={{marginLeft: 'auto'}}>
            <button onClick={clear} className="icon-button icon-button--clear">
              <span>Clear</span>
            </button>
            <button className="icon-button icon-button--share">
              <span>Share</span>
            </button>
            <button
              onClick={save}
              className={clsx('icon-button', 'icon-button--save', { 
                'icon-button--active': isSaving, 
                'icon-button--error': !!saveError 
              })}
            >
              <span>Save</span>
            </button>
          </div>
        </div>
        <ItemPicker />
        <div className="base">
          <div className="base-picker">
            <BasePicker value={base} onChange={setBase} />
          </div>
          <div className={clsx('base-layout', { 'show-grid': showGrid, 'show-outlines': showOutlines })}>
            <DroppableBase id={base} ref={baseRef} />
            {sortedItems.map((item) => (
              <DraggableItem
                filename={item.filename}
                id={item.id}
                style={{ position: 'absolute', top: `${item.position.top}px`, left: `${item.position.left}px` }}
                key={item.id}
              />
            ))}
          </div>
        </div>
        <div className="reserve-gap"></div>
        <div className="debug">
          <label>
            <input type="checkbox" checked={showGrid} onChange={(event) => setShowGrid(event.target.checked)} />
            show grid
          </label>
          <br />
          <label>
            <input type="checkbox" checked={showOutlines} onChange={(event) => setShowOutlines(event.target.checked)} />
            show item outlines
          </label>
        </div>
      </div>
      <DragOverlay dropAnimation={({ active, dragOverlay }) => (
        new Promise((resolve) => {
          const id = active.data.current?.id;
          if (id && poofItemId.current === id) {
            console.log('poof!');
            active.node.classList.add('poof', 'poof-active');
            dragOverlay.node.classList.add('poof');

            setTimeout(() => {
              active.node.classList.remove('poof', 'poof-active');
              dragOverlay.node.classList.remove('poof');
              poofItemId.current = null;
              resolve();
            }, POOF_DURATION);
          } else {
            resolve();
          }
        })
      )}>
        {draggingItem && (
          <div style={{ cursor: 'move' }}>
            <StaticItem filename={draggingItem} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

export default App;
