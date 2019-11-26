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
  }

  async componentDidMount() {
    const { match } = this.props;

    let response;

    try {
      response = await examApi.getOneById(match.params.id);
    } catch (err) {
      console.error(err);
    }

    if (!response.success) {
      console.error(response.data);
      return;
    }

    const exam = response.data;

    this.setState((state) => ({ ...state, exam }));
  }

  getTimeLeftUntilStart() {
    let rv = '';
    const { exam } = this.state;

    const aDay = 24 * 60 * 60;
    const anHour = 60 * 60;
    const aMinute = 60;

    const now = dayjs();
    const start = dayjs(exam.startDate);

    let secondsLeft = start.unix() - now.unix();

    const daysLeft = parseInt(secondsLeft / aDay, 10);
    secondsLeft -= daysLeft * aDay;

    if (daysLeft > 0) {
      rv += `~ ${daysLeft} дни`;
      return rv;
    }

    const hoursLeft = parseInt(secondsLeft / anHour, 10);
    secondsLeft -= hoursLeft * anHour;

    if (hoursLeft > 0) {
      rv += `${withLeadingZero(hoursLeft)}:`;
    }

    const minutesLeft = parseInt(secondsLeft / aMinute, 10);
    secondsLeft -= minutesLeft * aMinute;

    if (minutesLeft > 0) {
      rv += `${withLeadingZero(minutesLeft)}:`;
    }

    rv += `${withLeadingZero(secondsLeft)}`;

    return rv;
  }

  render() {
    const { exam } = this.state;

    if (exam === null) {
      return <LoadingAnimation />;
    }

    const start = dayjs(exam.startDate);
    const startString = start.format('DD MMM YYYY, HH:mm');

    const timeLeftUntilStart = this.getTimeLeftUntilStart();

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
