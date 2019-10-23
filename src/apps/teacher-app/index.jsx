import React from 'react';
import withLayout from '../../utils/withLayout';
import CreateQuestion from '../../containers/create-question';

const PAGES = [
  { pathname: '/questions', name: 'Въпроси' },
  { pathname: '/tests', name: 'Тестове' },
];

const TeacherApp = () => (
  <CreateQuestion />
);

export default withLayout(TeacherApp, PAGES);
