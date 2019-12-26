import React from 'react';
import { Switch, Route } from 'react-router-dom';

import withLayout from '../../utils/withLayout';

import TeacherDashboard from '../../containers/teacher-dashboard';

import QuestionFormManager from '../../containers/question-form-manager';
import QuestionList from '../../containers/question-list';

import ExamCreator from '../../containers/exam-creator';
import ExamList from '../../components/exam-list';
import ExamView from '../../containers/exam-view';
import ExamResults from '../../containers/exam-results';

import allExams from '../../utils/allExams';
import pastExams from '../../utils/pastExams';

const PAGES = [
  { pathname: '/create-question', name: 'Създай нов въпрос' },
  { pathname: '/questions', name: 'Всички въпроси' },

  { pathname: '/create-exam', name: 'Създай нов тест' },
  { pathname: '/exams', name: 'Всички тестове' },

  { pathname: '/results', name: 'Изпитни резултати' },
];

function TeacherApp() {
  const AllExamsList = allExams(ExamList);
  const ResultsList = pastExams(ExamList);

  return (
    <Switch>
      <Route path="/exam/:id">
        <ExamView />
      </Route>

      <Route path="/results/:examId">
        <ExamResults />
      </Route>

      <Route path="/results">
        <ResultsList
          urlBuilder={(exam) => `/results/${exam.id}`}
        />
      </Route>

      <Route path="/create-question">
        <QuestionFormManager />
      </Route>

      <Route path="/questions">
        <QuestionList />
      </Route>

      <Route path="/create-exam">
        <ExamCreator />
      </Route>

      <Route path="/exams">
        <AllExamsList
          urlBuilder={(exam) => `/exam/${exam.id}`}
        />
      </Route>

      <Route path="/">
        <TeacherDashboard />
      </Route>
    </Switch>
  );
}

export default withLayout(TeacherApp, PAGES);
