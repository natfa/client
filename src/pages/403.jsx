import React from 'react';
import ReactDOM from 'react-dom';

import Forbidden from '../components/forbidden';
import withRouter from '../utils/withRouter';

(async function IIFE() {
  const rootNode = document.getElementById('root');

  const ForbiddenWithRouter = withRouter(Forbidden, '/403');

  ReactDOM.render(<ForbiddenWithRouter />, rootNode);
}());
