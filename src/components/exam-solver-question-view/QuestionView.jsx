import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import AnswerView from '../exam-solver-answer-view';

const QuestionView = ({
  question,
  givenAnswerId,
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
    </Grid>

    <Divider />

    <Grid item>
      <AnswerView
        answers={question.answers}
        selectedAnswerId={givenAnswerId}
        onAnswerChange={(e) => {
          const { value } = e.target;
          const answerId = value;

          selectAnswer(Number(question.id), Number(answerId));
        }}
      />
    </Grid>
  </Grid>
);

QuestionView.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    points: PropTypes.number,
    answers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
  givenAnswerId: PropTypes.number,
  selectAnswer: PropTypes.func.isRequired,
};

export default QuestionView;
