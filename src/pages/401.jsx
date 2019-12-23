import React from 'react';
import ReactDOM from 'react-dom';

import Unauthorized from '../components/unauthorized';

import withRouter from '../utils/withRouter';

(async function IIFE() {
  const rootNode = document.getElementById('root');

  const UnauthorizedWithRouter = withRouter(Unauthorized, '/401');

  ReactDOM.render(<UnauthorizedWithRouter />, rootNode);
}());
