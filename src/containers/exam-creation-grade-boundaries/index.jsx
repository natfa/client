import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import GradeBoundary from '../../components/grade-boundary';

import courseApi from '../../api/course';

class ExamCreationGradeBoundaries extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      courses: [],
      selectedCourse: null,
    };

    this.addSelectedCourse = this.addSelectedCourse.bind(this);
    this.deleteCourseBoundary = this.deleteCourseBoundary.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handlePointsChange = this.handlePointsChange.bind(this);
  }

  /**
   * Populates the courses array in the state
   */
  componentDidMount() {
    courseApi
      .getAllCourses()
      .then((courses) => {
        if (courses === null) {
          console.error('courses is null');
          return;
        }

        this.setState((state) => ({ ...state, courses }));
      })
      .catch((err) => console.error(err));
  }

  /**
   * adds a new boundary item to the boundaries object
   */
  addSelectedCourse() {
    const { selectedCourse } = this.state;
    const { boundaries, onBoundariesUpdate } = this.props;

    // prevent clicking without a selection
    if (selectedCourse === null) return;

    const newBoundaries = [
      ...boundaries,
      {
        course: selectedCourse,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
      },
    ];

    onBoundariesUpdate(newBoundaries);

    this.setState((state) => ({ ...state, selectedCourse: null }));
  }

  /**
   * removes a boundary
   */
  deleteCourseBoundary(course) {
    const { boundaries, onBoundariesUpdate } = this.props;

    const newBoundaries = boundaries
      .filter((boundary) => boundary.course.id !== course.id);

    onBoundariesUpdate(newBoundaries);
  }

  /**
   * changes the points for a specific boundary for a specific grade
   */
  handlePointsChange(course, grade, points) {
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
      if (boundary.course.id !== course.id) return boundary;

      const newBoundary = {
        ...boundary,
        [grade]: pointsNum,
      };

      return newBoundary;
    });

    onBoundariesUpdate(newBoundaries);
  }

  handleSelectChange(e) {
    const { courses } = this.state;

    const course = courses.find((c) => c.name === e.target.value);

    // reset
    if (course === undefined) {
      this.setState((state) => ({ ...state, selectedCourse: null }));
      return;
    }

    this.setState((state) => ({ ...state, selectedCourse: course }));
  }

  render() {
    const {
      courses,
      selectedCourse,
    } = this.state;

    const {
      maxPoints,
      boundaries,
      onCancel,
      onSubmit,
    } = this.props;

    const unusedCourses = courses.filter((course) => {
      const used = boundaries
        .find((boundary) => boundary.course.id === course.id);

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

        {unusedCourses.length > 0
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
                value={selectedCourse ? selectedCourse.name : ''}
                variant="outlined"
                onChange={this.handleSelectChange}
                fullWidth
              >
                {unusedCourses.map((course) => (
                  <MenuItem key={course.id} value={course.name}>
                    {course.name}
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
                  onClick={this.addSelectedCourse}
                >
                  добави
                </Button>
              </Grid>
            </Grid>

          </Grid>
        )}

        {boundaries.map((boundary) => (
          <Grid key={boundary.course.id} item>
            <GradeBoundary
              boundary={boundary}
              maxPoints={maxPoints}
              onPointsChange={(grade, points) => {
                this.handlePointsChange(boundary.course, grade, points);
              }}
              onDelete={() => this.deleteCourseBoundary(boundary.course)}
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
    course: PropTypes.object,
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
