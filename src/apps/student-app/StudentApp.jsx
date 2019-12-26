import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

import withLayout from '../../utils/withLayout';

import ExamsTable from '../../components/exams-table';
import StudentExamView from '../../containers/student-exam-view';
import ExamSolver from '../../containers/exam-solver';
import StudentExamResult from '../../containers/student-exam-result';
import StudentDashboard from '../../containers/student-dashboard';
import StudentResultList from '../../containers/student-result-list';
import LoadingAnimation from '../../components/loading-animation';

import upcomingExams from '../../utils/upcomingExams';

import studentApi from '../../api/student';

const PAGES = [
  { pathname: '/exams', name: 'Всички изпити' },
  { pathname: '/results', name: 'Резултати' },
];

class StudentApp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      student: null,
    };
  }

  componentDidMount() {
    studentApi
      .getStudent()
      .then((student) => {
        if (student === null) {
          alert('You might be in the wrong place...');
          console.error('Student is not a student');

          return;
        }

        this.setState((state) => ({ ...state, student }));
      })
      .catch((err) => console.error(err));
  }

  render() {
    const { student } = this.state;

    if (student === null) {
      return <LoadingAnimation />;
    }

    const UpcomingExamsTable = (props) => {
      const Table = upcomingExams(ExamsTable);

      return (
        <>
          <Typography variant="h5">Всички предстоящи изпити</Typography>
          <Table {...props} />
        </>
      );
    };

    return (
      <Switch>
        <Route path="/exam/:id">
          <StudentExamView />
        </Route>

        <Route path="/solve/:id">
          <ExamSolver />
        </Route>

        <Route path="/results/:examId">
          <StudentExamResult
            studentId={student.id}
          />
        </Route>

        <Route path="/exams">
          <UpcomingExamsTable
            urlBuilder={(exam) => `/exam/${exam.id}`}
          />
        </Route>

        <Route path="/results">
          <StudentResultList
            studentId={student.id}
          />
        </Route>

        <Route path="/">
          <StudentDashboard />
        </Route>
      </Switch>
    );
  }
}

export default withLayout(StudentApp, PAGES);
