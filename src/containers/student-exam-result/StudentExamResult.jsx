import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import CorrectIcon from '@material-ui/icons/Check';
import IncorrectIcon from '@material-ui/icons/Close';

import PaddedPaper from '../../components/padded-paper';
import LoadingAnimation from '../../components/loading-animation';

import examApi from '../../api/exam';

class StudentExamResult extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exam: null,
      grade: null,
      studentSolution: null,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { examId } = match.params;
    // TODO: Grab the student id somehow
    const studentId = 3;

    examApi
      .getStudentExamResults(examId, studentId)
      .then((data) => {
        this.setState((state) => ({
          ...state,
          exam: data.exam,
          grade: data.grade,
          studentSolution: data.solution,
        }));
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { exam, grade, studentSolution } = this.state;

    if (exam === null && grade === null && studentSolution === null) {
      return <LoadingAnimation />;
    }

    return (
      <Grid
        container
        direction="column"
        spacing={5}
      >
        <Grid item>
          <Typography variant="h4" color="primary">{exam.name}</Typography>
        </Grid>

        <Grid item>
          <Typography variant="h5">
            {`Оценка: ${grade}`}
          </Typography>
        </Grid>

        <Divider />

        <Grid
          item
          container
          spacing={2}
          direction="column"
        >
          {exam.questions.map((question) => {
            const solution = studentSolution.find((s) => s.questionId === question.id);

            return (
              <Grid
                key={question.id}
                item
              >
                <QuestionResult question={question} solution={solution} />
              </Grid>
            );
          })}
        </Grid>


      </Grid>
    );
  }
}

StudentExamResult.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      examId: PropTypes.string,
    }),
  }).isRequired,
};


function QuestionResult({ question, solution }) {
  const givenAnswer = question.answers.find((answer) => answer.id === solution.answerId);

  return (
    <PaddedPaper elevation={2} square>
      <Grid
        container
        direction="column"
        spacing={2}
      >
        <Grid item container>
          <Grid xs={8} item>
            <Typography variant="h6">{question.text}</Typography>
          </Grid>

          <Grid xs={4} item>
            <Typography variant="body1">Media of the question</Typography>
          </Grid>
        </Grid>

        <Divider />

        <Grid item>
          <Grid
            item
            container
            direction="row"
            wrap="wrap"
          >
            {question.answers.map((answer) => {
              const props = {
                variant: 'body1',
              };

              if (answer.correct) {
                props.style = {
                  color: 'green',
                };
              }

              return (
                <Grid xs={12} item key={answer.id}>
                  <Typography {...props}>{answer.text}</Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>

        <Divider />

        <Grid item container alignItems="center">
          <Typography variant="body1" align="justify" style={{ lineHeight: '30px' }}>
            {`You answered: ${givenAnswer.text}`}
          </Typography>

          {givenAnswer.correct ? <CorrectIcon style={{ color: 'green' }} /> : <IncorrectIcon style={{ color: 'red' }} />}
        </Grid>
      </Grid>
    </PaddedPaper>
  );
}

QuestionResult.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    answers: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
      correct: PropTypes.bool,
    })),
    name: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
  solution: PropTypes.shape({
    questionId: PropTypes.string,
    answerId: PropTypes.string,
  }).isRequired,
};

export default withRouter(StudentExamResult);
