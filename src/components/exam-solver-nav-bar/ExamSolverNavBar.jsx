import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import ForwardIcon from '@material-ui/icons/ArrowForward';
import BackIcon from '@material-ui/icons/ArrowBack';

import './styles.css';

const QuestionNavigator = ({
  questions,
  selectedQuestion,

  selectQuestion,
}) => questions.map((question, i) => {
  const props = {
    variant: 'h5',
    key: question.id,
    onClick: () => selectQuestion(question.id),
  };

  if (question.id === selectedQuestion.id) {
    props.className = 'selected';
  }

  return (
    <Typography {...props}>
      {i + 1}
    </Typography>
  );
});


const ExamSolverNavBar = ({
  questions,
  selectedQuestion,

  selectQuestion,
  onSubmit,
}) => (
  <div className="exam-solver-nav-bar">
    <Grid
      container
      spacing={2}
      direction="column"
    >
      <Grid
        className="question-navigator"
        item
        container
        direction="row"
        wrap="nowrap"
      >
        <QuestionNavigator
          questions={questions}
          selectedQuestion={selectedQuestion}
          selectQuestion={selectQuestion}
        />
      </Grid>

      <Divider />

      <Grid
        item
        container
        direction="row"
        wrap="nowrap"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={onSubmit}
          >
            предай
          </Button>
        </Grid>

        <Grid item>
          <Typography variant="h2">00:00</Typography>
        </Grid>

        <Grid item>
          <Button
            startIcon={<BackIcon />}
            size="large"
            variant="contained"
            style={{
              marginRight: '10px',
            }}
            onClick={() => {
              const questionIndex = questions.findIndex((q) => q.id === selectedQuestion.id);
              if (questionIndex === -1) return;

              if (questionIndex === 0) {
                const questionId = questions[questions.length - 1].id;
                selectQuestion(questionId);
                return;
              }

              const questionId = questions[questionIndex - 1].id;
              selectQuestion(questionId);
            }}
          >
            назад
          </Button>
          <Button
            endIcon={<ForwardIcon />}
            size="large"
            variant="contained"
            onClick={() => {
              const questionIndex = questions.findIndex((q) => q.id === selectedQuestion.id);
              if (questionIndex === -1) return;

              if (questionIndex === questions.length - 1) {
                const questionId = questions[0].id;
                selectQuestion(questionId);
                return;
              }

              const questionId = questions[questionIndex + 1].id;
              selectQuestion(questionId);
            }}
          >
            напред
          </Button>
        </Grid>
      </Grid>
    </Grid>
  </div>
);

ExamSolverNavBar.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedQuestion: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,

  selectQuestion: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default ExamSolverNavBar;
