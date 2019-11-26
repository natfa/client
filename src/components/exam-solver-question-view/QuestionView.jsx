import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import MediaList from '../media-list';
import AnswerView from '../exam-solver-answer-view';

const QuestionView = ({
  question,

  selectAnswer,
}) => (
  <Grid
    container
    direction="column"
    spacing={6}
  >
    <Grid container item direction="row">
      <Grid item xs={12} sm={7}>
        <Typography variant="h5">{question.text}</Typography>
      </Grid>
      {question.media
        && (
        <Grid item xs={12} sm={5}>
          <MediaList media={question.media} />
        </Grid>
        )}
    </Grid>

    <Divider />

    <Grid item>
      <AnswerView
        answers={question.answers}
        selectedAnswerId={question.selectedAnswerId}
        onAnswerChange={(e) => {
          const { value } = e.target;
          const answerId = value;

          selectAnswer(question.id, answerId);
        }}
      />
    </Grid>
  </Grid>
);

QuestionView.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.object),
    selectedAnswerId: PropTypes.string,
    media: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  selectAnswer: PropTypes.func.isRequired,
};

export default QuestionView;
