import React from 'react'

import './styles.css'

function LoadingComponent(props) {
  return (
    <div className="LoadingComponent">
      <p>Зареждане...</p>
      <img src="https://digitalsynopsis.com/wp-content/uploads/2016/06/loading-animations-preloader-gifs-ui-ux-effects-3.gif" alt="Loading content animation" />
    </div>
  )
}

export default LoadingComponent