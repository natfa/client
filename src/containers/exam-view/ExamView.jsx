import React from 'react';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ExamQuestionList from '../../components/exam-question-list';
import LoadingAnimation from '../../components/loading-animation';
import examApi from '../../api/exam';
import mediaApi from '../../api/media';

import bufferToBlob from '../../utils/bufferToBlob';
import ttsToString from '../../utils/ttsToString';

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

      const exam = response.data;

      this.setState((state) => ({ ...state, exam }));

      exam.questions.forEach((question) => {
        mediaApi
          .getManyByQuestionId(question.id)
          .then((buffers) => {
            if (buffers === null) {
              console.error('Media is null');
              return;
            }

            if (buffers.length === 0) {
              return;
            }

            const media = buffers.map((buffer) => bufferToBlob(buffer));

            this.setState((state) => {
              const questions = state.exam.questions.map((q) => {
                if (q.id !== question.id) return q;

                return {
                  ...q,
                  media,
                };
              });

              return {
                exam: {
                  ...state.exam,
                  questions,
                },
              };
            });
          });
      });
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

    const timeToSolve = ttsToString(exam.timeToSolve);

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
