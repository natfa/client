import React from 'react';
import ReactDOM from 'react-dom';

import NotFound from '../components/not-found';

import withRouter from '../utils/withRouter';

(async function IIFE() {
  const rootNode = document.getElementById('root');

  const NotFoundWithRouter = withRouter(NotFound, '/404');

  ReactDOM.render(<NotFoundWithRouter />, rootNode);
}());
