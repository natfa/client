import React from 'react';
import { Switch, Route } from 'react-router-dom';

import withLayout from '../../utils/withLayout';

import ExamList from '../../components/exam-list';
import StudentExamView from '../../containers/student-exam-view';
import ExamSolver from '../../containers/exam-solver';
import StudentExamResult from '../../containers/student-exam-result';
import StudentDashboard from '../../containers/student-dashboard';
import StudentResultList from '../../containers/student-result-list';

import upcomingExams from '../../utils/upcomingExams';

const PAGES = [
  { pathname: '/exams', name: 'Всички изпити' },
  { pathname: '/results', name: 'Резултати' },
];


function StudentApp() {
  const UpcomingExamsList = upcomingExams(ExamList);

  return (
    <Switch>
      <Route path="/exam/:id">
        <StudentExamView />
      </Route>

      <Route path="/solve/:id">
        <ExamSolver />
      </Route>

      <Route path="/results/:examId">
        <StudentExamResult />
      </Route>

      <Route path="/exams">
        <UpcomingExamsList
          urlBuilder={(exam) => `/exam/${exam.id}`}
        />
      </Route>

      <Route path="/results">
        <StudentResultList />
      </Route>

      <Route path="/">
        <StudentDashboard />
      </Route>
    </Switch>
  );
}

export default withLayout(StudentApp, PAGES);
