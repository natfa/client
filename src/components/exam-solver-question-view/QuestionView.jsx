import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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
    <Grid item>
      <div className="question-text">
        <Typography variant="h5">{question.text}</Typography>
      </div>
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
  }).isRequired,
  selectAnswer: PropTypes.func.isRequired,
};

export default QuestionView;
