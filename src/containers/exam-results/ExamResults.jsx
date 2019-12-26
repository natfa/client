import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';

import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

import Link from '../../components/link';

import examApi from '../../api/exam';

class ExamResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const { examId } = match.params;

    examApi
      .getExamResults(examId)
      .then((examResults) => {
        if (examResults === null) {
          return;
        }

        console.log(examResults);
        this.setState((state) => ({ ...state, results: examResults }));
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { results } = this.state;

    return (
      <Grid container>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  Студент
                </TableCell>
                <TableCell align="right">
                  Оценка
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {results.map((result) => {
                const { student, examId, grade } = result;

                return (
                  <TableRow key={student.id} hover>
                    <TableCell align="left">
                      <Typography>
                        <MuiLink component={Link} to={`/results/${examId}/${student.id}`}>
                          {student.email}
                        </MuiLink>
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      {grade}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    );
  }
}

ExamResults.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      examId: PropTypes.string,
    }),
  }).isRequired,
};

export default withRouter(ExamResults);
