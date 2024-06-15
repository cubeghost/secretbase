import React from 'react';

import { RenderBase } from '../Base';
import { RenderItem } from '../Item';

const StaticRender = ({ items, base }) => (
  <RenderBase
    ItemComponent={RenderItem}
    items={items}
    base={base}
  />
);

export default StaticRender;
