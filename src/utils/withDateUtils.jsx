import React from 'react';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import DayjsUtils from '@date-io/dayjs';

const withDateUtils = (Component) => (props) => (
  <MuiPickersUtilsProvider utils={DayjsUtils}>
    <Component {...props} />
  </MuiPickersUtilsProvider>
);

export default withDateUtils;
