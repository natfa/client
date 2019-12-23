import React from 'react';
import dayjs from 'dayjs';

import { Link as RouterLink } from 'react-router-dom';

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

import ttsToString from '../../utils/ttsToString';

const Link = React.forwardRef((props, ref) => <RouterLink ref={ref} {...props} />);

class StudentDashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      upcomingExams: [],
    };
  }

  componentDidMount() {
    // get upcoming exams
    examApi
      .getUpcomingExams()
      .then((exams) => {
        const upcomingExams = exams.filter((exam) => {
          const startDate = dayjs(exam.startDate);

          const inThirtyDays = dayjs().add(30, 'day');

          return startDate.isBefore(inThirtyDays);
        }).sort((a, b) => {
          const startA = dayjs(a.startDate);
          const startB = dayjs(b.startDate);

          if (startA.isBefore(startB)) return -1;

          if (startA.isAfter(startB)) return 1;

          return 0;
        });


        this.setState((state) => ({ ...state, upcomingExams }));
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { upcomingExams } = this.state;

    return (
      <Grid
        container
        direction="column"
        spacing={5}
      >
        {upcomingExams.length > 0
        && (
          <Grid
            item
            container
            direction="column"
            spacing={2}
          >
            <Grid item>
              <Typography variant="h5">Предстоящи изпити</Typography>
            </Grid>

            <Grid item>
              <TableContainer component={Paper}>
                <Table aria-label="upcoming exams table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">
                        Изпит
                      </TableCell>
                      <TableCell align="center">
                        Начало
                      </TableCell>
                      <TableCell align="right">
                        Продължителност
                      </TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {upcomingExams.map((exam) => {
                      const startDate = dayjs(exam.startDate).format('DD MMM YYYY, HH:mm');
                      const timeToSolve = ttsToString(exam.timeToSolve);

                      return (
                        <TableRow key={exam.id} hover>
                          <TableCell align="left">
                            <MuiLink component={Link} to={`/exam/${exam.id}`}>
                              {exam.name}
                            </MuiLink>
                          </TableCell>
                          <TableCell align="center">
                            {startDate}
                          </TableCell>
                          <TableCell align="right">
                            {timeToSolve}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>

          </Grid>
        )}

      </Grid>
    );
  }
}

export default StudentDashboard;
