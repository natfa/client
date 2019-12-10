import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import GradeBoundary from '../../components/grade-boundary';

import specialtyApi from '../../api/specialty';

class ExamCreationGradeBoundaries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      specialties: [],
      selectedSpecialty: null,
    };

    this.addSelectedSpecialty = this.addSelectedSpecialty.bind(this);
    this.deleteSpecialty = this.deleteSpecialty.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handlePointsChange = this.handlePointsChange.bind(this);
  }

  /**
   * Populates the specialties array in the state
   */
  componentDidMount() {
    specialtyApi
      .getAllSpecialties()
      .then((specialties) => {
        if (specialties === null) {
          console.error('specialties is null');
          return;
        }

        this.setState((state) => ({ ...state, specialties }));
      })
      .catch((err) => console.error(err));
  }

  /**
   * adds a new boundary item to the boundaries object
   */
  addSelectedSpecialty() {
    const { selectedSpecialty } = this.state;
    const { boundaries, onBoundariesUpdate } = this.props;

    // prevent clicking without a selection
    if (selectedSpecialty === null) return;

    const newBoundaries = [
      ...boundaries,
      {
        specialty: selectedSpecialty,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
      },
    ];

    onBoundariesUpdate(newBoundaries);

    this.setState((state) => ({ ...state, selectedSpecialty: null }));
  }

  /**
   * removes a boundary
   */
  deleteSpecialty(specialty) {
    const { boundaries, onBoundariesUpdate } = this.props;

    const newBoundaries = boundaries
      .filter((boundary) => boundary.specialty.id !== specialty.id);

    onBoundariesUpdate(newBoundaries);
  }

  /**
   * changes the points for a specific boundary for a specific grade
   */
  handlePointsChange(specialty, grade, points) {
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

    const newBoundaries = boundaries.map((boundary) => {
      if (boundary.specialty.id !== specialty.id) return boundary;

      const newBoundary = {
        ...boundary,
        [grade]: pointsNum,
      };

      return newBoundary;
    });

    onBoundariesUpdate(newBoundaries);
  }

  handleSelectChange(e) {
    const { specialties } = this.state;

    const specialty = specialties.find((s) => s.name === e.target.value);

    // reset
    if (specialty === undefined) {
      this.setState((state) => ({ ...state, selectedSpecialty: null }));
      return;
    }

    this.setState((state) => ({ ...state, selectedSpecialty: specialty }));
  }

  render() {
    const {
      specialties,
      selectedSpecialty,
    } = this.state;

    const {
      maxPoints,
      boundaries,
      onCancel,
      onSubmit,
    } = this.props;

    const unusedSpecialties = specialties.filter((specialty) => {
      const used = boundaries
        .find((boundary) => boundary.specialty.id === specialty.id);

      return used === undefined;
    });

    return (
      <Grid
        container
        direction="column"
        spacing={2}
      >
        <Grid item xs={12}>
          <Typography align="center" variant="h4">Граници за оценки</Typography>
        </Grid>

        {unusedSpecialties.length > 0
        && (
          <Grid
            item
            container
            xs={12}
            justify="space-around"
            alignItems="center"
          >
            <Grid
              item
              xs={12}
              sm={7}
            >
              <Select
                value={selectedSpecialty ? selectedSpecialty.name : ''}
                variant="outlined"
                onChange={this.handleSelectChange}
                fullWidth
              >
                {unusedSpecialties.map((specialty) => (
                  <MenuItem key={specialty.id} value={specialty.name}>
                    {specialty.name}
                  </MenuItem>
                ))}
              </Select>
            </Grid>

            <Grid
              item
              container
              justify="space-around"
              xs={12}
              sm={3}
            >
              <Grid item>
                <Button
                  variant="outlined"
                  onClick={this.addSelectedSpecialty}
                >
                  добави
                </Button>
              </Grid>
            </Grid>

          </Grid>
        )}

        {boundaries.map((boundary) => (
          <Grid key={boundary.specialty.id} item>
            <GradeBoundary
              boundary={boundary}
              maxPoints={maxPoints}
              onPointsChange={(grade, points) => {
                this.handlePointsChange(boundary.specialty, grade, points);
              }}
              onDelete={() => this.deleteSpecialty(boundary.specialty)}
            />
          </Grid>
        ))}

        <Grid
          container
          item
          xs={12}
          justify="space-between"
        >
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={onCancel}
            >
              назад
            </Button>
          </Grid>

          <Grid item>
            <Button
              disabled={boundaries.length === 0}
              variant="contained"
              color="primary"
              onClick={onSubmit}
            >
              създай тест
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

ExamCreationGradeBoundaries.propTypes = {
  maxPoints: PropTypes.number.isRequired,
  boundaries: PropTypes.arrayOf(PropTypes.shape({
    specialty: PropTypes.object,
    3: PropTypes.number,
    4: PropTypes.number,
    5: PropTypes.number,
    6: PropTypes.number,
  })).isRequired,

  onBoundariesUpdate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ExamCreationGradeBoundaries;
