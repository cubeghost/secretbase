import React, { Component } from 'react';
import autobind from 'class-autobind';

import styles from './styles.scss';

class Audio extends Component {
  constructor() {
    super();
    autobind(this);

    this.audioRef = undefined;

    this.state = {
      playing: false,
    };
  }

  setRef(ref) {
    this.audioRef = ref;
  }

  toggleAudio() {
    this.setState(prevState => (
      { playing: !prevState.playing }
    ), () => {
      if (this.state.playing) {
        this.audioRef.volume = 0.25;
        this.audioRef.play();
      } else {
        this.audioRef.pause();
      }
    });
  }

  render() {
    return (
      <div className={styles.audio}>
        <audio loop ref={this.setRef}>
          <source src={require('./theme.mp3')} type="audio/mpeg" />
        </audio>
        <div className={styles.controls}>
          <button onClick={this.toggleAudio}>
            {this.state.playing ? 'Pause' : 'Play'} music
          </button>
        </div>
      </div>
    );
  }
};

export default Audio;
