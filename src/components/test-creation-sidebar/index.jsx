import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import {
  DateTimePicker,
  TimePicker,
} from '@material-ui/pickers';

import withDateUtils from '../../utils/withDateUtils';

const TestCreationSidebar = ({
  name,
  onNameChange,

  date,
  onDateChange,

  timeToSolve,
  onTimeToSolveChange,

  totalQuestionCount,
  totalPoints,
}) => (
  <Grid container direction="column" spacing={3}>
    <Grid item>
      <TextField
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
        margin="dense"
        fullWidth
        variant="outlined"
        label="Име"
      />
    </Grid>

    <Grid item>
      <TimePicker
        value={timeToSolve}
        onChange={onTimeToSolveChange}
        ampm={false}
        variant="inline"
        inputVariant="outlined"

        margin="dense"
        fullWidth
        label="Време за решаване"
      />
    </Grid>

    <Grid item>
      <DateTimePicker
        format="MMM D YYYY, HH:mm"
        ampm={false}
        value={date}
        onChange={onDateChange}
        variant="inline"
        inputVariant="outlined"

        margin="dense"
        fullWidth
        label="Дата и час на започване"
      />
    </Grid>

    <Grid item>
      <Divider />
    </Grid>

    <Grid item>
      <Typography>{`Общи точки: ${totalPoints}`}</Typography>
    </Grid>

    <Grid item>
      <Typography>{`Общ брой въпроси: ${totalQuestionCount}`}</Typography>
    </Grid>
  </Grid>
);

TestCreationSidebar.propTypes = {
  name: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,

  // Date-ing is hard...
  date: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  onDateChange: PropTypes.func.isRequired,

  // Date-ing is hard...
  timeToSolve: PropTypes.any, // eslint-disable-line react/forbid-prop-types
  onTimeToSolveChange: PropTypes.func.isRequired,

  totalQuestionCount: PropTypes.number.isRequired,
  totalPoints: PropTypes.number.isRequired,
};

TestCreationSidebar.defaultProps = {
  date: null,
  timeToSolve: null,
};

export default withDateUtils(TestCreationSidebar);
