import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

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
import ttsToString from '../../utils/ttsToString';

function ExamsTable({
  exams,
  urlBuilder,
}) {
  if (exams.length === 0) {
    return (
      <Typography variant="body1" align="center">
        Няма намерени изпити.
      </Typography>
    );
  }

  const generateUrl = (exam) => urlBuilder(exam);

  const sortedExams = exams.sort((examA, examB) => {
    const startA = dayjs(examA.startDate);
    const startB = dayjs(examB.startDate);

    if (startA.isBefore(startB)) {
      return -1;
    }

    if (startA.isAfter(startB)) {
      return 1;
    }

    return 0;
  });


  return (
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
          {sortedExams.map((exam) => {
            const startDate = dayjs(exam.startDate).format('DD MMM YYYY, HH:mm');
            const timeToSolve = ttsToString(exam.timeToSolve);

            return (
              <TableRow key={exam.id} hover>
                <TableCell align="left">
                  <Typography>
                    <MuiLink component={Link} to={generateUrl(exam)}>
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
  );
}

ExamsTable.propTypes = {
  exams: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    startDate: PropTypes.string,
    timeToSolve: PropTypes.number,
  })).isRequired,
  urlBuilder: PropTypes.func.isRequired,
};

export default ExamsTable;
