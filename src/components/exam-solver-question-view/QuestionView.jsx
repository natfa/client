import React from 'react';
import PropTypes from 'prop-types';

import AnswerView from '../exam-solver-answer-view';

const QuestionView = ({
  question,
}) => (
  <div>
    <p>{question.text}</p>

    <AnswerView answers={question.answers} />
  </div>
);

QuestionView.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.object),
  }).isRequired,
};

export default QuestionView;
