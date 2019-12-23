import React from 'react';
import ReactDOM from 'react-dom';

import LoadingAnimation from '../components/loading-animation';
import LandingApp from '../apps/landing-app';

import { getActiveSession } from '../api/session';
import withRouter from '../utils/withRouter';

(async function IIFE() {
  const rootNode = document.getElementById('root');

  ReactDOM.render(<LoadingAnimation />, rootNode);

  let account = null;
  try {
    account = await getActiveSession();
  } catch (err) {
    console.error(err);
    alert('Server not responding!');
  }

  if (account) {
    if (account.roles.includes('teacher')) {
      window.location.pathname = '/teacher';
    } else if (account.roles.includes('student')) {
      window.location.pathname = '/student';
    } else if (account.roles.includes('admin')) {
      window.location.pathname = '/admin';
    } else {
      window.location.pathname = '/403';
    }

    return;
  }

  const LandingAppWithRouter = withRouter(LandingApp, '/landing');

  ReactDOM.render(<LandingAppWithRouter />, rootNode);
}());
