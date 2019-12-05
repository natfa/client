import React from 'react';
import ReactDOM from 'react-dom';

import NotFound from '../components/not-found';

(async function IIFE() {
  const rootNode = document.getElementById('root');
  ReactDOM.render(<NotFound />, rootNode);
}());
