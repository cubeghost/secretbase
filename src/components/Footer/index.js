import React, { Component } from 'react';
import autobind from 'class-autobind';
import classNames from 'classnames';

import styles from './styles.scss';

class Footer extends Component {
  constructor() {
    super();
    autobind(this);

    this.state = {
      areCreditsOpen: false,
    };
  }

  toggleCredits() {
    this.setState(prevState => ({ areCreditsOpen: !prevState.areCreditsOpen }));
  }

  render() {
    const { areCreditsOpen } = this.state;

    return (
      <footer className={styles.footer}>
        {areCreditsOpen && (
          <div className={classNames(styles.credits, 'border')}>
            <h3>Big thanks to</h3>
            <p>
              <a href="http://yanneyanen.com/" target="_blank" rel="noopener">Janne Markkula</a> for
              the "poof" animation
            </p>
            <p>
              <a href="https://nickyflowers.bandcamp.com/" target="_blank" rel="noopener">Nicky Flowers</a> for
              making me a loop of the theme music
            </p>
            <hr />
            <p>
              All images, audio, and fonts used, unless otherwise stated, belong to Nintendo and GameFreak. No copyright infringement intended.
            </p>
          </div>
        )}

        <button onClick={this.toggleCredits}>
          <img className={styles.creditsButton} src={require('./credits.png')} alt="Credits" />
        </button>
      </footer>
    );
  }
}

export default Footer;
