import React from 'react';

import { RenderBase } from 'components/Base';
import { RenderItem } from 'components/Item';

const StaticRender = ({ items, base }) => (
  <RenderBase
    ItemComponent={RenderItem}
    items={items}
    base={base}
  />
);

export default StaticRender;
