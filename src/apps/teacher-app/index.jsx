import React from 'react';
import { Switch, Route } from 'react-router-dom';

import withLayout from '../../utils/withLayout';

import TeacherDashboard from '../../containers/teacher-dashboard';

import QuestionFormManager from '../../containers/question-form-manager';
import QuestionList from '../../containers/question-list';

import ExamCreator from '../../containers/exam-creator';

const PAGES = [
  { pathname: '/question', name: 'Създай нов въпрос' },
  { pathname: '/questions', name: 'Всички въпроси' },

  { pathname: '/exam', name: 'Създай нов тест' },
];

const TeacherApp = () => (
  <Switch>
    <Route path="/question">
      <QuestionFormManager />
    </Route>

    <Route path="/questions">
      <QuestionList />
    </Route>

    <Route path="/exam">
      <ExamCreator />
    </Route>

    <Route path="/">
      <TeacherDashboard />
    </Route>
  </Switch>
);

export default withLayout(TeacherApp, PAGES);
