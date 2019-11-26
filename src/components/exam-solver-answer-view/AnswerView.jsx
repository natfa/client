import React from 'react';
import PropTypes from 'prop-types';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

const AnswerView = ({
  answers,
  selectedAnswerId,

  onAnswerChange,
}) => (
  <RadioGroup value={selectedAnswerId} onChange={onAnswerChange}>
    {answers.map((answer) => (
      <FormControlLabel
        key={answer.id}
        value={answer.id}
        label={answer.text}
        labelPlacement="end"
        control={<Radio color="primary" />}
      />
    ))}
  </RadioGroup>
);

AnswerView.propTypes = {
  answers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  })).isRequired,
  selectedAnswerId: PropTypes.string,

  onAnswerChange: PropTypes.func.isRequired,
};

AnswerView.defaultProps = {
  selectedAnswerId: '',
};

export default AnswerView;
