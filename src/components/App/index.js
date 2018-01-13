import React, { Component } from 'react';
import classNames from 'classnames';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import Header from 'components/Header';
import Base from 'components/Base';
import ItemPicker from 'components/ItemPicker';
import CustomDragLayer from 'components/CustomDragLayer';

import { randomId } from 'src/utils';

import styles from './styles.scss';

class App extends Component {

  constructor(props) {
    super(props);

    this.handleDrop = this.handleDrop.bind(this);
    this.removeItem = this.removeItem.bind(this);

    this.state = {
      base: 'base_0001_2',
      items: {},
    };
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

    delete items[item.id];

    this.setState({ items });
  }

  render() {
    const { base, items } = this.state;
    const itemProps = {
      removeItem: this.removeItem,
    };

    return (
      <div className={styles.app}>
        <Header />
        <section className={styles.main}>
          <div className={classNames(styles.column, styles.columnLeft)}>
            <ItemPicker
              itemProps={itemProps}
            />
          </div>
          <div className={classNames(styles.column, styles.columnRight)}>
            <Base
              base={base}
              items={items}
              itemProps={itemProps}
              handleDrop={this.handleDrop}
            />
          </div>
        </section>
        <CustomDragLayer />
      </div>
    );
  }

};

export default DragDropContext(HTML5Backend)(App);
