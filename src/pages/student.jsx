import React from 'react';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import dayjsDuration from 'dayjs/plugin/duration';

dayjs.extend(dayjsDuration);

import LoadingAnimation from '../components/loading-animation';
import StudentApp from '../apps/student-app';

import { getActiveSession } from '../api/session';
import withRouter from '../utils/withRouter';

(async function IIFE() {
  const rootNode = document.getElementById('root');

  ReactDOM.render(<LoadingAnimation />, rootNode);

  let authenticated = null;
  try {
    authenticated = await getActiveSession();
  } catch (err) {
    console.error(err);
  }

  if (!authenticated) {
    window.location.pathname = '/landing';
    return;
  }

  const StudentAppWithRouter = withRouter(StudentApp, '/student');

  ReactDOM.render(<StudentAppWithRouter />, rootNode);
}());
