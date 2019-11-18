import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';

const TextFieldWithMargin = withStyles({
  root: {
    margin: '0.5rem',
  },
})(TextField);

const GradeBoundary = ({
  grade,
  maxPoints,

  points,
  onPointsChange,
}) => (
  <Grid
    alignItems="center"
    container
    direction="row"
    wrap="nowrap"
  >
    <Grid item>
      <Typography>{`Точки за ${grade}:`}</Typography>
    </Grid>

    <Grid item>
      <TextFieldWithMargin
        margin="dense"
        variant="outlined"
        value={points}
        onChange={(e) => onPointsChange(e.target.value)}
      />
    </Grid>

    <Grid item>
      <Typography>{` / ${maxPoints}`}</Typography>
    </Grid>
  </Grid>
);

GradeBoundary.propTypes = {
  grade: PropTypes.number.isRequired,
  maxPoints: PropTypes.number.isRequired,

  points: PropTypes.number.isRequired,
  onPointsChange: PropTypes.func.isRequired,
};

export default GradeBoundary;
