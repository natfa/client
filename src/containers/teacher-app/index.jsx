import React from 'react';
import withLayout from '../../utils/withLayout';

const PAGES = [
  { pathname: '/questions', name: 'Въпроси' },
  { pathname: '/tests', name: 'Тестове' },
];

const TeacherApp = () => (
  <p>Hello teacher app</p>
);

export default withLayout(TeacherApp, PAGES);
