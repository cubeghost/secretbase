import React from 'react';
import ReactDOMServer from 'react-dom/server';

import StaticRender from './components/StaticRender';
import { domainRoot } from './utils';

export default ({ base, items }) => {
  const rendered = ReactDOMServer.renderToStaticMarkup(
    <StaticRender
      base={base}
      items={items}
    />
  );

  const stylesheet = `${domainRoot()}/build/style.css`;
  const html = `<html><head><link rel="stylesheet" href="${stylesheet}"></head><body>${rendered}</body></html>`;

  const [width, height] = BASE_DIMENSIONS[base];

  return {
    html,
    width,
    height
  };
}