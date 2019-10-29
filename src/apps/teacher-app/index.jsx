import React from 'react';
import { Switch, Route } from 'react-router-dom';

import withLayout from '../../utils/withLayout';

import QuestionFormManager from '../../containers/question-form-manager';
import QuestionList from '../../containers/question-list';

const PAGES = [
  { pathname: '/all', name: 'Въпроси' },
  { pathname: '/new', name: 'Нов въпрос' },
];

const TeacherApp = () => (
  <Switch>
    <Route path="/new">
      <QuestionFormManager />
    </Route>

    <Route path="/all">
      <QuestionList />
    </Route>

    <Route path="/">
      <QuestionFormManager />
    </Route>
  </Switch>
);

export default withLayout(TeacherApp, PAGES);
