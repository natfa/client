import React from 'react';
import ReactDOM from 'react-dom';

import { getActiveSession } from '../api/session';

import LoadingAnimation from '../components/loading-animation';
import LandingApp from '../containers/landing-app';

(async function IIFE() {
  const rootNode = document.getElementById('root');

  ReactDOM.render(<LoadingAnimation />, rootNode);

  const authenticated = await getActiveSession();

  if (authenticated) {
    window.location.pathname = '/teacher';
    return;
  }

  ReactDOM.render(<LandingApp />, rootNode);
}());
