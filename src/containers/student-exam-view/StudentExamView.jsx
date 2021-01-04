import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { withRouter, Redirect } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import LoadingAnimation from '../../components/loading-animation';

import examApi from '../../api/exam';

import withLeadingZero from '../../utils/withLeadingZero';
import ttsToString from '../../utils/ttsToString';

class StudentExamView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exam: null,
      studentHasAlreadySubmitted: false,
      timeLeftUntilStart: null,
      redirectToExamSolver: false,
    };

    this.tick = this.tick.bind(this);
    this.startSolvingExam = this.startSolvingExam.bind(this);
  }

  async componentDidMount() {
    const { match } = this.props;

    try {
      const response = await examApi.getOneById(match.params.id);

      if (!response.success) {
        console.error(response.data);
        return;
      }

      const exam = response.data;

      this.setState((state) => ({
        ...state,
        exam,
        studentHasAlreadySubmitted: exam.studentExams[0].grade !== null,
      }));

      // do it once so that it shows up
      this.tick();

      // setup a timer to do it every second
      this.timerID = setInterval(this.tick, 1000);
    } catch (err) {
      console.error(err);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const { exam } = this.state;

    const now = dayjs();
    const start = dayjs(exam.startDate);

    const setTimeLeftUntilStart = (str) => {
      this.setState((state) => ({
        ...state,
        timeLeftUntilStart: str,
      }));
    };

    if (now.isAfter(start)) {
      setTimeLeftUntilStart('00:00:00');
      return;
    }

    const timeLeft = dayjs.duration(start.diff(now));

    const hours = timeLeft.hours();
    const minutes = timeLeft.minutes();
    const seconds = timeLeft.seconds();

    const timeString = `${withLeadingZero(hours)}:${withLeadingZero(minutes)}:${withLeadingZero(seconds)}`;

    setTimeLeftUntilStart(timeString);
  }

  startSolvingExam() {
    this.setState((state) => ({ ...state, redirectToExamSolver: true }));
  }

  render() {
    const {
      exam,
      timeLeftUntilStart,
      redirectToExamSolver,
      studentHasAlreadySubmitted,
    } = this.state;

    if (redirectToExamSolver) {
      return <Redirect push to={`/solve/${exam.id}`} />;
    }

    if (exam === null) {
      return <LoadingAnimation />;
    }

    const now = dayjs();
    const start = dayjs(exam.startDate);
    const end = dayjs(exam.endDate);
    const startString = start.format('DD MMM YYYY, HH:mm');

    const timeToSolveString = ttsToString(exam.timeToSolve);

    let infoComponent = null;

    if (now.isAfter(end)) {
      infoComponent = (
        <Typography
          align="center"
          variant="h5"
          gutterBottom
        >
          Изпитът е приключил.
        </Typography>
      );
    } else if (studentHasAlreadySubmitted) {
      infoComponent = (
        <Typography
          align="center"
          variant="h5"
          gutterBottom
        >
          Изпитът Ви е предаден.
        </Typography>
      );
    } else {
      infoComponent = (
        <>
          <Typography
            align="center"
            variant="h5"
            gutterBottom
          >
            Изпита започва след:
          </Typography>

          <Typography
            align="center"
            variant="h4"
            color="primary"
            gutterBottom
          >
            {timeLeftUntilStart}
          </Typography>
        </>
      );
    }

    return (
      <Grid
        container
        spacing={2}
        direction="row-reverse"
      >

        <Grid
          item
          container
          direction="column"
          xs={12}
          sm={3}
        >
          <Grid container direction="row" justify="space-between" item>
            <Typography color="primary">Начало:</Typography>
            <Typography>{startString}</Typography>
          </Grid>

          <Grid container direction="row" justify="space-between" item>
            <Typography color="primary">Продължителност:</Typography>
            <Typography>{timeToSolveString}</Typography>
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sm={9}
        >
          <Grid item>
            <Typography
              align="center"
              variant="h3"
              gutterBottom
            >
              {exam.name}
            </Typography>
          </Grid>

          <Grid item>
            {infoComponent}
          </Grid>

          <Grid item>
            <Button
              disabled={studentHasAlreadySubmitted || start.isAfter(now)}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              onClick={this.startSolvingExam}
            >
              започни
            </Button>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

StudentExamView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default withRouter(StudentExamView);
