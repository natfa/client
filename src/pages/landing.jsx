import React from 'react';
import ReactDOM from 'react-dom';

import { getActiveSession } from '../api/session';

import LoadingAnimation from '../components/loading-animation';
import LandingApp from '../containers/landing-app';

(async function IIFE() {
  const rootNode = document.getElementById('root');

  ReactDOM.render(<LoadingAnimation />, rootNode);

  let authenticated = null;
  try {
    authenticated = await getActiveSession();
  } catch (err) {
    console.error(err);
    alert('Server not responding!');
  }

  if (authenticated) {
    window.location.pathname = '/teacher';
    return;
  }

  ReactDOM.render(<LandingApp />, rootNode);
}());
