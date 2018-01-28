import React, { Component } from 'react';
import autobind from 'class-autobind';
import classNames from 'classnames';
import copy from 'copy-to-clipboard';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import styles from './styles.scss';

class Copy extends Component {
  constructor() {
    super();
    autobind(this);

    this.state = {
      showTooltip: false,
    };
  }

  text() {
    const { text } = this.props;
    if (text instanceof Function) {
      return text();
    } else {
      return String(text);
    }
  }

  copy() {
    const text = this.text();

    copy(text);

    this.setState({ showTooltip: true }, () => {
      setTimeout(() => {
        this.setState({ showTooltip: false });
      }, 2000);
    });
  }

  render() {
    /* eslint-disable no-unused-vars */
    const { children, text, className, ...otherProps } = this.props;

    return (
      <button onClick={this.copy} className={classNames(styles.button, className)} {...otherProps}>
        <TransitionGroup>
          {this.state.showTooltip && (
            <CSSTransition classNames="tooltip" timeout={400} key="tooltip">
              <span className={styles.tooltip}>Copied ✅</span>
            </CSSTransition>
          )}
        </TransitionGroup>
        {children}
      </button>
    );
  }
}

export default Copy;
