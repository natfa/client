import React from 'react';
import { Switch, Route } from 'react-router-dom';

import withLayout from '../../utils/withLayout';
import CreateQuestion from '../../containers/create-question';
import QuestionList from '../../containers/question-list';

const PAGES = [
  { pathname: '/all', name: 'Въпроси' },
  { pathname: '/new', name: 'Нов въпрос' },
];

const TeacherApp = () => (
  <Switch>
    <Route path="/new">
      <CreateQuestion />
    </Route>

    <Route path="/all">
      <QuestionList />
    </Route>

    <Route path="/">
      {/* TODO: this should eventually be a dashboard */}
      <CreateQuestion />
    </Route>
  </Switch>
);

export default withLayout(TeacherApp, PAGES);
