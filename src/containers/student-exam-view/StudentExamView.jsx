import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

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
    };

    this.tick = this.tick.bind(this);
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

      this.setState((state) => ({ ...state, exam }));

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

    const aDay = 24 * 60 * 60;
    const anHour = 60 * 60;
    const aMinute = 60;

    // dayjs.unix() returns seconds not milliseconds
    let secondsLeft = start.unix() - now.unix();

    const daysLeft = parseInt(secondsLeft / aDay, 10);
    secondsLeft -= daysLeft * aDay;

    if (daysLeft > 0) {
      setTimeLeftUntilStart(`~ ${daysLeft} дни`);
      return;
    }

    const hoursLeft = parseInt(secondsLeft / anHour, 10);
    secondsLeft -= hoursLeft * anHour;

    const minutesLeft = parseInt(secondsLeft / aMinute, 10);
    secondsLeft -= minutesLeft * aMinute;

    const timeString = `${withLeadingZero(hoursLeft)}:${withLeadingZero(minutesLeft)}:${withLeadingZero(secondsLeft)}`;

    setTimeLeftUntilStart(timeString);
  }

  render() {
    const { exam, timeLeftUntilStart } = this.state;

    if (exam === null) {
      return <LoadingAnimation />;
    }

    const now = dayjs();
    const start = dayjs(exam.startDate);
    const startString = start.format('DD MMM YYYY, HH:mm');

    const timeToSolveString = ttsToString(exam.timeToSolve);

    return (
      <Grid spacing={2} container direction="row-reverse" style={{ height: '100%' }}>
        <Grid container direction="column" item xs={12} sm={3}>
          <Grid container direction="row" justify="space-between" item>
            <Typography color="primary">Начало:</Typography>
            <Typography>{startString}</Typography>
          </Grid>

          <Grid container direction="row" justify="space-between" item>
            <Typography color="primary">Продължителност:</Typography>
            <Typography>{timeToSolveString}</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={9} style={{ height: '100%', overflow: 'auto', overflowX: 'hidden' }}>
          <Typography
            align="center"
            variant="h3"
            gutterBottom
          >
            {exam.name}
          </Typography>

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

          <Link to={`/solve/${exam.id}`}>
            <Button
              disabled={start.isAfter(now)}
              variant="contained"
              color="primary"
              size="large"
              fullWidth
            >
              започни
            </Button>
          </Link>
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
