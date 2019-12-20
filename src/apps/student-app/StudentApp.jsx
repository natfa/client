import React from 'react';
import { Switch, Route } from 'react-router-dom';

import withLayout from '../../utils/withLayout';

import ExamList from '../../components/exam-list';
import StudentExamView from '../../containers/student-exam-view';
import ExamSolver from '../../containers/exam-solver';
import StudentExamResult from '../../containers/student-exam-result';
import StudentDashboard from '../../containers/student-dashboard';

import upcomingExams from '../../utils/upcomingExams';
import pastExams from '../../utils/pastExams';

const PAGES = [
  { pathname: '/exams', name: 'Изпити' },
  { pathname: '/results', name: 'Резултати' },
];


function StudentApp() {
  const UpcomingExamsList = upcomingExams(ExamList);
  const PastExamsList = pastExams(ExamList);

  return (
    <Switch>
      <Route path="/exams">
        <UpcomingExamsList />
      </Route>

      <Route path="/results">
        <PastExamsList />
      </Route>

      <Route path="/exam/:id">
        <StudentExamView />
      </Route>

      <Route path="/solve/:id">
        <ExamSolver />
      </Route>

      <Route path="/results/:examId">
        <StudentExamResult />
      </Route>

      <Route path="/">
        <StudentDashboard />
      </Route>
    </Switch>
  );
}

export default withLayout(StudentApp, PAGES);
