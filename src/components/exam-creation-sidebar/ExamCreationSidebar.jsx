import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';

import {
  DateTimePicker,
  TimePicker,
} from '@material-ui/pickers';

import withDateUtils from '../../utils/withDateUtils';

const ExamCreationSidebar = ({
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

ExamCreationSidebar.propTypes = {
  name: PropTypes.string.isRequired,
  onNameChange: PropTypes.func.isRequired,

  // not sure if this shape declaration actually does the job...
  date: PropTypes.shape(dayjs.Dayjs).isRequired,
  onDateChange: PropTypes.func.isRequired,

  // not sure if this shape declaration actually does the job...
  timeToSolve: PropTypes.shape(dayjs.Dayjs).isRequired,
  onTimeToSolveChange: PropTypes.func.isRequired,

  totalQuestionCount: PropTypes.number.isRequired,
  totalPoints: PropTypes.number.isRequired,
};

export default withDateUtils(ExamCreationSidebar);
