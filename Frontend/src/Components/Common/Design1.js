// Design1.js

import React from 'react';
import styles from './Design1.module.css'; // Make sure to create a CSS module file

const Design1 = () => {
  return (
    <div>
    <div className={styles.landingAnimation}>


      {/* <h4>Simple CSS Wave</h4> */}



   
      <div className={styles.sineWave}>
        <svg className={styles.svgWaves} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"></path>
          </defs>
          <g className={styles.svgWavesParallax}>
            <use xlinkHref="#gentle-wave" x="48" y="0"></use>
            <use xlinkHref="#gentle-wave" x="48" y="3"></use>
            <use xlinkHref="#gentle-wave" x="48" y="5"></use>
            <use xlinkHref="#gentle-wave" x="48" y="7"></use>
          </g>
        </svg>
      </div>
    </div>
    </div>
  );
};

export default Design1;
