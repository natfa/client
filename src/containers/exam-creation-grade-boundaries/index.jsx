import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import PaddedPaper from '../../components/padded-paper';
import GradeBoundary from '../../components/grade-boundary';

import { possibleGrades } from '../../constants';

class ExamCreationGradeBoundaries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handlePointsChange(grade, points) {
    const {
      boundaries,
      onBoundariesUpdate,
      maxPoints,
    } = this.props;

    let pointsNum = Number(points);

    if (Number.isNaN(pointsNum)) return;
    if (pointsNum > maxPoints) {
      pointsNum = maxPoints;
    }

    const newBoundaries = {
      ...boundaries,
      [grade]: pointsNum,
    };

    onBoundariesUpdate(newBoundaries);
  }

  render() {
    const {
      maxPoints,
      boundaries,
      onCancel,
      onSubmit,
    } = this.props;

    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <PaddedPaper square elevation={2}>
            {possibleGrades.map((grade) => {
              if (grade === 2) {
                return null;
              }

              return (
                <GradeBoundary
                  key={grade}
                  grade={grade}
                  maxPoints={maxPoints}

                  points={boundaries[grade]}
                  onPointsChange={(points) => this.handlePointsChange(grade, points)}
                />
              );
            })}
          </PaddedPaper>
        </Grid>
        <Grid container item justify="space-around">
          <Button
            variant="outlined"
            color="secondary"
            onClick={onCancel}
          >
            назад
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            създай тест
          </Button>
        </Grid>
      </Grid>
    );
  }
}

ExamCreationGradeBoundaries.propTypes = {
  maxPoints: PropTypes.number.isRequired,
  boundaries: PropTypes.shape({
    3: PropTypes.number,
    4: PropTypes.number,
    5: PropTypes.number,
    6: PropTypes.number,
  }).isRequired,

  onBoundariesUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ExamCreationGradeBoundaries;
