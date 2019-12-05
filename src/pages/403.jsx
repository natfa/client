import React from 'react';
import ReactDOM from 'react-dom';

import Forbidden from '../components/forbidden';

(async function IIFE() {
  const rootNode = document.getElementById('root');
  ReactDOM.render(<Forbidden />, rootNode);
}());
