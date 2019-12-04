import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import PaddedPaper from '../padded-paper';

import { possibleGrades } from '../../constants';

const GradeBoundary = ({
  boundary,
  maxPoints,
  onPointsChange,
  onDelete,
}) => (
  <PaddedPaper elevation={2} square>
    <Grid
      container
      direction="column"
      spacing={2}
      alignItems="center"
    >
      <Grid
        item
        container
        alignItems="center"
        justify="space-between"
      >
        <Grid item>
          <Typography variant="h5">
            {`Оценки за специалност ${boundary.course.name}`}
          </Typography>
        </Grid>

        <Grid item>
          <IconButton
            onClick={onDelete}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid
        item
        container
        direction="column"
        spacing={1}
        xs={12}
        sm={7}
      >
        {possibleGrades.map((grade) => {
          if (grade === 2) return null;

          return (
            <Grid
              key={grade}
              item
              container
              direction="row"
              wrap="wrap"
              justify="space-around"
              alignItems="center"
            >
              <Grid item xs={12} sm={2}>
                <Typography>{`Точки за ${grade}`}</Typography>
              </Grid>

              <Grid item xs={9} sm={3}>
                <TextField
                  onChange={(e) => onPointsChange(grade, e.target.value)}
                  value={boundary[grade]}
                  variant="outlined"
                />
              </Grid>

              <Grid item xs={3} sm={1}>
                <Typography>{`/ ${maxPoints}`}</Typography>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  </PaddedPaper>
);

GradeBoundary.propTypes = {
  boundary: PropTypes.shape({
    course: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    3: PropTypes.number,
    4: PropTypes.number,
    5: PropTypes.number,
    6: PropTypes.number,
  }).isRequired,
  maxPoints: PropTypes.number.isRequired,
  onPointsChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default GradeBoundary;
