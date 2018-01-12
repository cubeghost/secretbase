import React, { Component } from 'react';
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

  render() {
    const { base, items } = this.state;

    return (
      <div className={styles.app}>
        <Header />
        <section className={styles.main}>
          <ItemPicker />
          <Base
            base={base}
            items={items}
            handleDrop={this.handleDrop}
          />
        </section>
        <CustomDragLayer />
      </div>
    );
  }

};

export default DragDropContext(HTML5Backend)(App);
