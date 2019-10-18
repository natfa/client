import React from 'react';

import './styles.css';
import animation from '../../../public/loading-animation.gif';

const LoadingAnimation = () => (
  <div className="LoadingAnimation">
    <p>Зареждане...</p>
    <img src={animation} alt="Loading content animation" />
  </div>
);

export default LoadingAnimation;
