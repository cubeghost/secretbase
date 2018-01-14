import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'class-autobind';
import { DragLayer } from 'react-dnd';

import Item from 'components/Item';

import styles from './styles.scss';

const collect = monitor => ({
  item: monitor.getItem(),
  itemType: monitor.getItemType(),
  initialOffset: monitor.getInitialSourceClientOffset(),
  currentOffset: monitor.getSourceClientOffset(),
  isDragging: monitor.isDragging(),
});

class CustomDragLayer extends Component {

  constructor(props) {
    super(props);
    autobind(this);
  }

  getItemStyles() {
    const { initialOffset, currentOffset, snapToGrid } = this.props;

    if (!initialOffset || !currentOffset) {
      return { display: 'none' };
    }

    let { x, y } = currentOffset;

    // TODO determine how much of this is necessary/correct
    x -= initialOffset.x;
    y -= initialOffset.y;
    x = snapToGrid(x);
    y = snapToGrid(y);
    x += initialOffset.x;
    y += initialOffset.y;

    return {
      transform: `translate(${x}px, ${y}px)`
    };
  }

  render() {
    const { item, isDragging } = this.props;

    if (!isDragging) {
      return null;
    }

    return (
      <div className={styles.customDragLayer}>
        <Item type={item.type} style={this.getItemStyles()} />
      </div>
    );
  }
}

CustomDragLayer.propTypes = {
  item: PropTypes.object,
  itemType: PropTypes.string,
  initialOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  currentOffset: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  isDragging: PropTypes.bool.isRequired,
  snapToGrid: PropTypes.func.isRequired,
};

export default DragLayer(collect)(CustomDragLayer);
