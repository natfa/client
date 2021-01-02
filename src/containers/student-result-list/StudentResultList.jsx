import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MuiLink from '@material-ui/core/Link';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import examApi from '../../api/exam';

import Link from '../../components/link';

class StudentResultList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    const { studentId } = this.props;

    examApi
      .getPastExams()
      .then((exams) => {
        const resultPromises = exams
          .map((exam) => examApi.getStudentExamResults(exam.id, studentId));

        return Promise.all(resultPromises);
      })
      .then((results) => {
        this.setState((state) => ({
          ...state,
          results: results.filter((result) => result),
        }));
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { results } = this.state;

    return (
      <Grid
        container
        direction="column"
        spacing={2}
      >
        <Grid item>
          <Typography variant="h5">Резултати</Typography>
        </Grid>

        <Grid item>
          <TableContainer component={Paper}>
            <Table aria-label="results for past exams table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">
                    Изпит
                  </TableCell>
                  <TableCell align="right">
                    Оценка
                  </TableCell>
                  <TableCell align="right">
                    Верни отговори/общо
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {results.map((result) => {
                  const { grade, exam, solution } = result;

                  const numOfCorrectAnswers = solution.reduce((acc, sol) => {
                    const question = exam.questions.find((q) => q.id === sol.questionId);
                    const correctAnswer = question.answers.find((answer) => answer.correct);

                    if (sol.answerId === correctAnswer.id) {
                      return acc + 1;
                    }

                    return acc;
                  }, 0);

                  return (
                    <TableRow key={exam.id} hover>

                      <TableCell align="left">
                        <Typography>
                          <MuiLink component={Link} to={`/results/${exam.id}`}>
                            {exam.name}
                          </MuiLink>
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Typography>
                          {grade}
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Typography>
                          {`${numOfCorrectAnswers}/${exam.questions.length}`}
                        </Typography>
                      </TableCell>

                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

      </Grid>
    );
  }
}

StudentResultList.propTypes = {
  studentId: PropTypes.number.isRequired,
};

export default StudentResultList;
