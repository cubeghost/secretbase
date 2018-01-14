import React, { Component } from 'react';
import ReactDOMServer from 'react-dom/server';
import classNames from 'classnames';
import autobind from 'class-autobind';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import download from 'downloadjs';

import Header from 'components/Header';
import Options from 'components/Options';
import Base from 'components/Base';
import ItemPicker from 'components/ItemPicker';
import BasePicker from 'components/BasePicker';
import CustomDragLayer from 'components/CustomDragLayer';
import StaticRender from 'components/StaticRender';

import { STRICT_GRID_SPACING, EASY_GRID_SPACING, POOF_DURATION } from 'src/constants';
import { randomId } from 'src/utils';

import styles from './styles.scss';

class App extends Component {

  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      base: 'base_0001_2',
      items: {},
      enableUnofficialItems: false,
      enableStrictGrid: true,
    };
  }

  snapToGrid(d) {
    const gridSpacing = this.state.enableStrictGrid ? STRICT_GRID_SPACING : EASY_GRID_SPACING;
    return Math.round(d / gridSpacing) * gridSpacing;
  }

  handleDrop(item, x, y) {
    const items = Object.assign({}, this.state.items);

    if (item.id) {
      items[item.id].x = x;
      items[item.id].y = y;
    } else {
      const id = randomId();
      const newItem = {
        id: id,
        type: item.type,
        x: x,
        y: y,
      };
      items[id] = newItem;
    }

    this.setState({ items });
  }

  removeItem(item) {
    const items = Object.assign({}, this.state.items);

    items[item.id].isRemoving = true;

    this.setState({ items }, () => {
      setTimeout(() => {

        const items = Object.assign({}, this.state.items);

        delete items[item.id];

        this.setState({ items });

      }, POOF_DURATION);
    });
  }

  selectBase(base) {
    if (base) {
      this.setState({
        base: base.id
      });
    }
  }

  toggleUnofficialItems(event) {
    this.setState({
      enableUnofficialItems: event.target.checked
    });
  }

  toggleStrictGrid(event) {
    this.setState({
      toggleStrictGrid: event.target.checked
    });
  }

  clearItems() {
    this.setState({
      items: {}
    });
  }

  save() {
    const { base, items } = this.state;

    const rendered = ReactDOMServer.renderToStaticMarkup(
      <StaticRender
        base={base}
        items={items}
      />
    );
    const { width, height } = document.getElementById('baseImage').getBoundingClientRect();
    const stylesheet = document.styleSheets[0].href;

    const html = `<html><head><link rel="stylesheet" href="${stylesheet}"></head><body>${rendered}</body></html>`;

    fetch('/save.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        html,
        width,
        height
      })
    }).then(response => {
      if (!response.ok) { throw Error(response.statusText); }
      return response.blob();
    }).then(blob => {
      download(blob, `secretbase_${randomId()}.png`);
    });
  }

  render() {
    const { base, items, enableUnofficialItems, enableStrictGrid } = this.state;
    const itemProps = {
      removeItem: this.removeItem,
    };

    return (
      <div className={styles.app}>
        <div className={styles.top}>
          <Header />
          <BasePicker
            base={base}
            selectBase={this.selectBase}
          />
        </div>
        <section className={styles.main}>
          <div className={classNames(styles.column, styles.columnLeft)}>
            <Options
              enableUnofficialItems={enableUnofficialItems}
              toggleUnofficialItems={this.toggleUnofficialItems}
              enableStrictGrid={enableStrictGrid}
              toggleStrictGrid={this.toggleStrictGrid}
              clearItems={this.clearItems}
              save={this.save}
            />
            <ItemPicker
              itemProps={itemProps}
              enableUnofficialItems={enableUnofficialItems}
            />
          </div>
          <div className={classNames(styles.column, styles.columnRight)}>
            <Base
              base={base}
              items={items}
              itemProps={itemProps}
              handleDrop={this.handleDrop}
              snapToGrid={this.snapToGrid}
            />
          </div>
        </section>
        <CustomDragLayer
          snapToGrid={this.snapToGrid}
        />
      </div>
    );
  }

};

export default DragDropContext(HTML5Backend)(App);
