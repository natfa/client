import React from 'react';
import PropTypes from 'prop-types';

import ExamQustionItem from '../exam-question-item';

const ExamQuestionList = ({ questions }) => (
  <div>
    {questions.map((question) => (
      <ExamQustionItem
        key={question.id}
        question={question}
      />
    ))}
  </div>
);

ExamQuestionList.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ExamQuestionList;
