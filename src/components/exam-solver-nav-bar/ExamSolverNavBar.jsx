import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import ForwardIcon from '@material-ui/icons/ArrowForward';
import BackIcon from '@material-ui/icons/ArrowBack';

import './styles.css';

const QuestionsNav = React.forwardRef(({
  questions,
  questionId,
  selectQuestion,
}, ref) => questions.map((question, i) => {
  const props = {
    variant: 'h5',
    key: question.id,
    onClick: () => selectQuestion(question.id),
  };

  if (question.selectedAnswerId !== undefined) {
    props.className = 'answered';
  }

  if (question.id === questionId) {
    props.className += ' selected';
    props.ref = ref;
  }

  return (
    <Typography {...props}>
      {i + 1}
    </Typography>
  );
}));

QuestionsNav.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  questionId: PropTypes.string,
  selectQuestion: PropTypes.func.isRequired,
};

QuestionsNav.defaultProps = {
  questionId: null,
};


const ExamSolverNavBar = React.forwardRef(({
  questions,
  questionId,
  timeLeft,
  selectQuestion,
  openSubmitPage,
}, ref) => (
  <Grid
    container
    className="exam-solver-nav-bar"
    direction="row"
    wrap="nowrap"
    justify="space-between"
    alignItems="center"
    spacing={2}
  >
    <Grid
      className="question-navigator"
      item
      container
      direction="row"
      wrap="nowrap"
      xs={12}
      sm={5}
    >
      <QuestionsNav
        ref={questionId !== null ? ref : null}
        questions={questions}
        questionId={questionId}
        selectQuestion={selectQuestion}
      />
      <Typography
        ref={questionId === null ? ref : null}
        variant="h5"
        onClick={openSubmitPage}
        className={questionId === null ? 'selected' : null}
      >
        Предай
      </Typography>
    </Grid>

    <Grid
      item
      container
      justify="center"
      xs={12}
      sm={2}
    >
      <Grid item>
        <Typography variant="h2">
          {timeLeft}
        </Typography>
      </Grid>
    </Grid>

    <Grid
      item
      container
      justify="flex-end"
      xs={12}
      sm={5}
    >
      <Grid item>
        <Button
          disabled={questions.findIndex((q) => q.id === questionId) === 0}
          startIcon={<BackIcon />}
          color="secondary"
          size="large"
          variant="contained"
          style={{
            marginRight: '10px',
          }}
          onClick={() => {
            if (questionId === null) {
              const lastQuestionId = questions[questions.length - 1].id;
              selectQuestion(lastQuestionId);
              return;
            }
            const questionIndex = questions
              .findIndex((q) => q.id === questionId);

            if (questionIndex <= 0) return;

            const { id } = questions[questionIndex - 1];
            selectQuestion(id);
          }}
        >
          назад
        </Button>
      </Grid>

      <Grid item>
        <Button
          disabled={questionId === null}
          endIcon={<ForwardIcon />}
          size="large"
          color="primary"
          variant="contained"
          onClick={() => {
            const questionIndex = questions
              .findIndex((q) => q.id === questionId);

            if (questionIndex === -1) return;

            if (questionIndex === questions.length - 1) {
              openSubmitPage();
              return;
            }

            const { id } = questions[questionIndex + 1];
            selectQuestion(id);
          }}
        >
          напред
        </Button>
      </Grid>
    </Grid>
  </Grid>
));

ExamSolverNavBar.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  questionId: PropTypes.string,
  timeLeft: PropTypes.string.isRequired,
  selectQuestion: PropTypes.func.isRequired,
  openSubmitPage: PropTypes.func.isRequired,
};

ExamSolverNavBar.defaultProps = {
  questionId: null,
};

export default ExamSolverNavBar;
