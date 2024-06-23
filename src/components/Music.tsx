import React, {useState, useEffect, useCallback, useRef} from 'react';

import music from '../assets/theme.mp3';

const Music = () => {
  const [isPlaying, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = useCallback(() => setPlaying(s => !s), []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.volume = 0.25;
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <>
      <button onClick={toggleMusic} className="icon-button icon-button--music">
        <span>{isPlaying ? 'Pause' : 'Play'} music</span>
      </button>
      <audio loop ref={audioRef}>
        <source src={music} type="audio/mpeg" />
      </audio>
    </>
  )
};

const MemoizedMusic = React.memo(Music);
export default MemoizedMusic;