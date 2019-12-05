import React from 'react';
import ReactDOM from 'react-dom';

import Unauthorized from '../components/unauthorized';

(async function IIFE() {
  const rootNode = document.getElementById('root');
  ReactDOM.render(<Unauthorized />, rootNode);
}());
