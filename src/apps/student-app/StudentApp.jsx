import React from 'react';
import { Switch, Route } from 'react-router-dom';

import withLayout from '../../utils/withLayout';

import ExamList from '../../containers/exam-list';
import StudentExamView from '../../containers/student-exam-view';
import ExamSolver from '../../containers/exam-solver';
import StudentExamResult from '../../containers/student-exam-result';

const StudentApp = () => (
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

    <Route path="/">
      <ExamList />
    </Route>
  </Switch>
);

export default withLayout(StudentApp);
