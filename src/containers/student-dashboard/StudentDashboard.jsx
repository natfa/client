import React from 'react';
import dayjs from 'dayjs';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import examApi from '../../api/exam';

import ExamsTable from '../../components/exams-table';

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
        <Grid
          item
          container
          direction="column"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h5">Предстоящи изпити (изпити в следващите 30 дни)</Typography>
          </Grid>

          <Grid item>
            <ExamsTable
              exams={upcomingExams}
              urlBuilder={(exam) => `/exam/${exam.id}`}
            />
          </Grid>

        </Grid>
      </Grid>
    );
  }
}

export default StudentDashboard;
