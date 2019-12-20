import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/Visibility';

import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';

import { Link } from 'react-router-dom';

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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Име</TableCell>
              <TableCell align="right">Начало</TableCell>
              <TableCell align="center">Продължителност</TableCell>
              <TableCell align="center">Виж</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {exams.map((exam) => {
              const startDate = dayjs(exam.startDate).format('DD MMM YYYY, HH:mm');
              const timeToSolve = ttsToString(exam.timeToSolve);

              return (
                <TableRow key={exam.id} hover>
                  <TableCell align="left">
                    <Typography>{exam.name}</Typography>
                  </TableCell>

                  <TableCell align="right">
                    <Typography>{startDate}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Typography>{timeToSolve}</Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Link to={`/exam/${exam.id}`}>
                      <IconButton>
                        <ViewIcon />
                      </IconButton>
                    </Link>
                  </TableCell>

                </TableRow>
              );
            })}
          </TableBody>
        </Table>
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
