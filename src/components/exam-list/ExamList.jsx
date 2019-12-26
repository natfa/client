import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

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

import Link from '../link';
import LoadingAnimation from '../loading-animation';
import ttsToString from '../../utils/ttsToString';

function ExamList({ exams }) {
  if (exams === null) {
    return <LoadingAnimation />;
  }

  if (exams.length === 0) {
    return (
      <Grid container>
        <Grid item>
          <Typography>Няма скорошни изпити.</Typography>
        </Grid>
      </Grid>
    );
  }
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography align="center" variant="h4" gutterBottom>
          Всички тестове
        </Typography>
      </Grid>

      <Grid item>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">Име</TableCell>
                <TableCell align="right">Начало</TableCell>
                <TableCell align="center">Продължителност</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {exams.map((exam) => {
                const startDate = dayjs(exam.startDate).format('DD MMM YYYY, HH:mm');
                const timeToSolve = ttsToString(exam.timeToSolve);

                return (
                  <TableRow key={exam.id} hover>
                    <TableCell align="left">
                      <Typography>
                        <MuiLink component={Link} to={`/exam/${exam.id}`}>
                          {exam.name}
                        </MuiLink>
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography>{startDate}</Typography>
                    </TableCell>

                    <TableCell align="center">
                      <Typography>{timeToSolve}</Typography>
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

ExamList.propTypes = {
  exams: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    timeToSolve: PropTypes.shape({
      hours: PropTypes.number,
      minutes: PropTypes.number,
    }),
  })),
};

ExamList.defaultProps = {
  exams: null,
};

export default ExamList;
