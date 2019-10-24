import React from 'react';

import Layout from '../components/layout';

const withLayout = (Component, pages) => (props) => (
  <Layout pages={pages}>
    <Component {...props} />
  </Layout>
);

export default withLayout;
