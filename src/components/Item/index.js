import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { DragSource } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';

import styles from './styles.scss';

export const ItemType = 'item';

const dragSource = {
  beginDrag: (props) => ({
    type: props.type,
    id: props.id,
    x: props.x || 0,
    y: props.y || 0,
  }),
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

class Item extends Component {
  componentDidMount() {
    this.props.connectDragPreview(getEmptyImage(), {
      captureDraggingState: true,
    });
  }

  render() {
    const { id, type, style, x, y, isDragging, connectDragSource } = this.props;
    const mergedStyle = style || {};

    if (x !== undefined && y !== undefined) {
      mergedStyle.position = 'absolute';
      mergedStyle.top = `${y}px`;
      mergedStyle.left = `${x}px`;
    }

    if (id && isDragging) {
      mergedStyle.opacity = 0;
    }

    return connectDragSource(
      <div className={styles.item} style={mergedStyle}>
        <img src={`/assets/items/${type}.png`} alt="" />
      </div>
    );
  }
}

Item.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
};

export default DragSource(
  ItemType,
  dragSource,
  collect,
)(Item);
