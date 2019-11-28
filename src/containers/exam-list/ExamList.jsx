import React from 'react';
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

import examApi from '../../api/exam';
import ttsToString from '../../utils/ttsToString';

class ExamList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exams: [],
    };
  }

  componentDidMount() {
    examApi
      .getAll()
      .then((response) => {
        const exams = response;

        // sort by date
        exams.sort((e1, e2) => {
          const start1 = dayjs(e1.startDate);
          const start2 = dayjs(e2.startDate);

          if (start1.isBefore(start2)) return -1;

          if (start1.isSame(start2)) return 0;

          return 1;
        });

        this.setState((state) => ({ ...state, exams }));
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { exams } = this.state;

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
                <TableCell>Име</TableCell>
                <TableCell align="right">Начало</TableCell>
                <TableCell align="right">Продължителност</TableCell>
                <TableCell align="right">Виж</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {exams.map((exam) => {
                const startDate = dayjs(exam.startDate).format('DD MMM YYYY, HH:mm');
                const timeToSolve = ttsToString(exam.timeToSolve);

                return (
                  <TableRow key={exam.id} hover>
                    <TableCell>{exam.name}</TableCell>
                    <TableCell align="right">{startDate}</TableCell>
                    <TableCell align="right">{timeToSolve}</TableCell>
                    <TableCell align="right">
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
}

export default ExamList;
