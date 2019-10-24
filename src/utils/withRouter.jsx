import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const withRouter = (Component, basename = '/') => (props) => (
  <Router basename={basename}>
    <Component {...props} />
  </Router>
);

export default withRouter;
