import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ExamQuestionList from '../../components/exam-question-list';
import LoadingAnimation from '../../components/loading-animation';
import examApi from '../../api/exam';

class ExamView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exam: null,
    };
  }

  async componentDidMount() {
    const { match } = this.props;

    try {
      const response = await examApi.getOneById(match.params.id);
      if (!response.success) {
        console.error(response.data);
        return;
      }

      this.setState((state) => ({ ...state, exam: response.data }));
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const { exam } = this.state;

    if (exam === null) {
      return <LoadingAnimation />;
    }

    const start = dayjs(exam.startDate).format('DD MMM YYYY, HH:mm');


    let timeToSolve = `${exam.timeToSolve.hours < 10
      ? `0${exam.timeToSolve.hours}`
      : exam.timeToSolve.hours}:`;

    timeToSolve += `${exam.timeToSolve.minutes < 10
      ? `0${exam.timeToSolve.minutes}`
      : exam.timeToSolve.minutes}`;

    return (
      <Grid spacing={2} container direction="row-reverse" style={{ height: '100%' }}>
        <Grid container direction="column" item xs={12} sm={3}>
          <Grid container direction="row" justify="space-between" item>
            <Typography color="primary">Начало:</Typography>
            <Typography>{start}</Typography>
          </Grid>

          <Grid container direction="row" justify="space-between" item>
            <Typography color="primary">Продължителност:</Typography>
            <Typography>{timeToSolve}</Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} sm={9} style={{ height: '100%', overflow: 'auto', overflowX: 'hidden' }}>
          <Typography
            align="center"
            variant="h4"
            gutterBottom
          >
            {exam.name}
          </Typography>

          <ExamQuestionList
            questions={exam.questions}
          />
        </Grid>
      </Grid>
    );
  }
}

ExamView.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default withRouter(ExamView);
