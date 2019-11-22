import React from 'react';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';

// import DateIOUtils from '@date-io/dayjs';
import DateIOUtils from '@date-io/date-fns';

const withDateUtils = (Component) => (props) => (
  <MuiPickersUtilsProvider utils={DateIOUtils}>
    <Component {...props} />
  </MuiPickersUtilsProvider>
);

export default withDateUtils;
