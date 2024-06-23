import React, { useCallback, useState } from "react";

import credits from '../assets/credits.png';

const Credits = () => {
  const [isOpen, setOpen] = useState(false);

  const toggleOpen = useCallback(() => setOpen(s => !s), []);

  return (
    <>
      {isOpen && (
        <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '25vw', zIndex: '3', padding: '1rem'}} className="credits with-cloud-border">
          <h3>Big thanks to</h3>
          <p>
            <a href="https://twitter.com/OddJayMarksman" target="_blank" rel="noopener">Janne Markkula</a> for
            the "<u className="poof">poof</u>" animation
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

      <button onClick={toggleOpen} className="credits-button util-pixelated">
        <img src={credits} height={21} alt="Credits" style={{ display: 'block' }} />
      </button>
    </>
  )
}

export default React.memo(Credits);