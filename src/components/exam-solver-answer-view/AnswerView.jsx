import React from 'react';
import PropTypes from 'prop-types';

const AnswerView = ({
  answers,
}) => answers.map((answer) => (
  <p key={answer.id}>{answer.text}</p>
));

AnswerView.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
};

export default AnswerView;
