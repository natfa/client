import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';

import ExamQustionItem from '../exam-question-item';

const ExamQuestionList = ({ questions }) => (
  <Grid container direction="column" spacing={3}>
    {questions.map((question) => (
      <Grid item key={question.id}>
        <ExamQustionItem
          question={question}
        />
      </Grid>
    ))}
  </Grid>
);

ExamQuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ExamQuestionList;
