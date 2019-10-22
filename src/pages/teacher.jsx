import React from 'react';
import ReactDOM from 'react-dom';

import { getActiveSession } from '../api/session';

import LoadingAnimation from '../components/loading-animation';
import TeacherApp from '../apps/teacher-app';

(async function IIFE() {
  const rootNode = document.getElementById('root');

  ReactDOM.render(<LoadingAnimation />, rootNode);

  let authenticated = null;
  try {
    authenticated = await getActiveSession();
  } catch (err) {
    console.error(err);
    // temp, remove after development
    authenticated = true;
  }

  if (!authenticated) {
    window.location.pathname = '/landing';
    return;
  }

  ReactDOM.render(<TeacherApp />, rootNode);
}());
