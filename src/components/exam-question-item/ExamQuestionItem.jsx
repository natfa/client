import React from 'react';
import PropTypes from 'prop-types';

import PaddedPaper from '../padded-paper';

const ExamQuestionItem = ({ question }) => (
  <PaddedPaper>
    <p>{question.text}</p>
  </PaddedPaper>
);

ExamQuestionItem.propTypes = {
  question: PropTypes.shape({
    text: PropTypes.string,
  }).isRequired,
};

export default ExamQuestionItem;
