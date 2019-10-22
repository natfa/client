import React from 'react';
import withLayout from '../../utils/withLayout';
import QuestionForm from '../../components/question-form';

const PAGES = [
  { pathname: '/questions', name: 'Въпроси' },
  { pathname: '/tests', name: 'Тестове' },
];

const TeacherApp = () => (
  <QuestionForm />
);

export default withLayout(TeacherApp, PAGES);
