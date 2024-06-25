import { useCallback, useState, useMemo, useRef, useEffect, ChangeEvent } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import type { Modifier, DragStartEvent, DragEndEvent } from '@dnd-kit/core';
import clsx from 'clsx';
import { useMediaQuery } from 'react-responsive';
import copy from 'copy-to-clipboard';

import { StaticItem, DraggableItem } from './components/Item';
import ItemPicker from './components/ItemPicker';
import { DroppableBase } from './components/Base';
import BasePicker from './components/BasePicker';

import { GRID_SIZE, POOF_DURATION } from './constants';
import type { ItemState, SaveData, BaseId, ItemFilename } from './types';
import { nanoid, sortItemsByDropped } from './utils';
import { minimizeSaveData, encodeSaveData, decodeSaveData, maximizeSaveData } from './share';
import title from './assets/title.png';
import { BASE_DIMENSIONS } from 'virtual:base-dimensions';
// @ts-expect-error
import Credits from './components/Credits';
import Music from "./components/Music"
import labelBase from './assets/label_base.png';
import Save from "./components/Save";
import DefaultItems from './components/DefaultItems';
import { useBaseCssVariables, useCssVariables } from './hooks';
import Share from './components/Share';

const MIN_PICKER_WIDTH = 280;

function createCustomSnapModifier(): Modifier {
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

// initialize
const defaultState: SaveData = {
  base: 'base_01',
  items: {},
  enableSnapToGrid: true,
  enableDefaultLaptop: true,
  enableDefaultLandscape: true,
  enableUnofficialItems: false,
};
const initialState = await (async () => {
  const params = new URLSearchParams(window.location.search);
  if (params.get('share') === '1') {
    const minimalSaveData = await decodeSaveData(`${window.location.search}`);
    const saveData = maximizeSaveData(minimalSaveData);

    window.history.replaceState({}, '', window.location.pathname);

    return {
      ...defaultState,
      ...saveData,
    };
  } else {
    return defaultState;
  }
})();

function App() {
  const [base, setBase] = useState<BaseId>(initialState.base);
  const [items, setItems] = useState<Record<string, ItemState>>(initialState.items);
  const [draggingItem, setDraggingItem] = useState<ItemFilename | null>(null);
  const baseRef = useRef<HTMLDivElement>(null);
  const poofItemId = useRef<string | null>(null);

  // TODO sync these with localstorage
  const [enableSnapToGrid, setSnapToGrid] = useState(initialState.enableSnapToGrid);
  const [enableDefaultLaptop, setDefaultLaptop] = useState(initialState.enableDefaultLaptop);
  const [enableDefaultLandscape, setDefaultLandscape] = useState(initialState.enableDefaultLandscape);
  const [enableUnofficialItems, setUnofficialItems] = useState(initialState.enableUnofficialItems);

  const saveDataRef = useRef<SaveData>({ base, items, enableSnapToGrid, enableDefaultLaptop, enableDefaultLandscape, enableUnofficialItems });
  useEffect(() => {
    saveDataRef.current = { base, items, enableSnapToGrid, enableDefaultLaptop, enableDefaultLandscape, enableUnofficialItems };
  }, [base, items, enableSnapToGrid, enableUnofficialItems]);

  const [showGrid, setShowGrid] = useState(false);
  const [showOutlines, setShowOutlines] = useState(false);

  const sortedItems = useMemo(() => sortItemsByDropped(items), [items]);

  const onClear = useCallback(() => {
    setItems({});
  }, []);

  const onChangeUnofficialItems = useCallback((event: ChangeEvent<HTMLInputElement>) => 
    setUnofficialItems(event.target.checked)
  , []);

  const getSaveData = useCallback(() => {
    return saveDataRef.current;
  }, []);
 
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

  const query = useMemo(() => {
    const [width] = BASE_DIMENSIONS[base];
    // margin + picker + gutter + base + margin
    const minWidth = GRID_SIZE + MIN_PICKER_WIDTH + GRID_SIZE + width + GRID_SIZE;
    return `(max-width: ${minWidth}px)`;
  }, [base]);

  const isMobile = useMediaQuery({ query });

  const cssVariables = useCssVariables();
  const baseCssVariables = useBaseCssVariables(base);

  return (
    <DndContext
      modifiers={modifiers}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      <div className={clsx('grid', { mobile: isMobile })} style={{ ...cssVariables, ...baseCssVariables }}>
        <header>
          <div>
            <h1>
              <img src={title} alt="hoenn secret base designer" className="util-pixelated" />
            </h1>
            {/* <Credits /> */}
          </div>
          <div style={{display: 'flex'}}>
            <Music />
            <button onClick={onClear} className="icon-button icon-button--clear">
              <span>Clear</span>
            </button>
            <Share getSaveData={getSaveData} />
            <Save getSaveData={getSaveData} />
          </div>
        </header>
        <div className="controls base-options with-border">
          <div className="with-border-top-bar">
            <h3>
              <img src={labelBase} height={12} alt="Base" className="util-block util-pixelated" />
            </h3>
            <div className="base-picker">
              <BasePicker value={base} onChange={setBase} />
            </div>
          </div>
          <label className="util-block">
            <input
              type="checkbox"
              checked={enableSnapToGrid}
              onChange={(event) => setSnapToGrid(event.target.checked)}
            />
            Snap to grid
          </label>
          <label className="util-block">
            <input
              type="checkbox"
              checked={enableDefaultLaptop}
              onChange={(event) => setDefaultLaptop(event.target.checked)}
            />
            Default laptop
          </label>
          <label className="util-block">
            <input
              type="checkbox"
              checked={enableDefaultLandscape}
              onChange={(event) => setDefaultLandscape(event.target.checked)}
            />
            Default landscape items
          </label>
        </div>
        <ItemPicker
          enableUnofficialItems={enableUnofficialItems}
          onChangeUnofficialItems={onChangeUnofficialItems}
        />
        <div className={clsx('base', { 'show-grid': showGrid, 'show-outlines': showOutlines })}>
          <DroppableBase id={base} ref={baseRef} />
          <DefaultItems
            base={base}
            enableDefaultLaptop={enableDefaultLaptop}
            enableDefaultLandscape={enableDefaultLandscape}
          />
          {sortedItems.map((item) => (
            <DraggableItem
              filename={item.filename}
              id={item.id}
              style={{ position: 'absolute', top: `${item.position.top}px`, left: `${item.position.left}px` }}
              key={item.id}
            />
          ))}
        </div>
        {!isMobile && <div className="reserve-gap-column" style={{ gridColumn: 'base-end / picker-start' }}></div>}
        <div className="reserve-gap-row" style={{ gridRow: 'header-end / controls-start' }}></div>
        <div className="reserve-gap-row" style={{ gridRow: 'controls-end / interactive-area-start' }}></div>
        <div className="debug with-bw-border">
          <div>
            <h4>debug</h4>
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
          {showOutlines && (
            <div>
              <label><div style={{ display: 'inline-block', background: 'var(--debug-item-color)', width: '1rem', height: '1rem' }} /> items</label><br />
              <label><div style={{ display: 'inline-block', background: 'var(--debug-default-item-color)', width: '1rem', height: '1rem' }} /> default items</label>
            </div>
          )}
        </div>
      </div>
      <DragOverlay dropAnimation={({ active, dragOverlay }) => (
        new Promise((resolve) => {
          const id = active.data.current?.id;
          if (id && poofItemId.current === id) {
            active.node.classList.add('poof', 'poof-active');
            dragOverlay.node.classList.add('poof');

            setTimeout(() => {
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
