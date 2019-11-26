import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import LoadingAnimation from '../../components/loading-animation';
import ExamSolverNavBar from '../../components/exam-solver-nav-bar';
import QuestionView from '../../components/exam-solver-question-view';

import examApi from '../../api/exam';

class ExamSolver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exam: null,
      selectedQuestion: null,
    };

    this.selectQuestion = this.selectQuestion.bind(this);
  }

  async componentDidMount() {
    const { match } = this.props;

    examApi
      .getOneById(match.params.id)
      .then((response) => {
        if (!response.success) {
          console.error(response.data);
          return;
        }

        const exam = response.data;
        const selectedQuestion = exam.questions[0];

        this.setState((state) => ({
          ...state,
          exam,
          selectedQuestion,
        }));
      })
      .catch((err) => console.error(err));
  }

  selectQuestion(questionId) {
    const { exam } = this.state;

    const selectedQuestion = exam.questions.find((q) => q.id === questionId);
    if (!selectedQuestion) return;

    this.setState((state) => ({
      ...state,
      selectedQuestion,
    }));
  }

  render() {
    const { exam, selectedQuestion } = this.state;

    if (exam === null) {
      return <LoadingAnimation />;
    }

    return (
      <div>
        <QuestionView
          question={selectedQuestion}
        />

        <ExamSolverNavBar
          questions={exam.questions}
          selectedQuestion={selectedQuestion}
          selectQuestion={this.selectQuestion}
          onSubmit={() => alert('Not implemented')}
        />
      </div>
    );
  }
}

ExamSolver.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }).isRequired,
};

export default withRouter(ExamSolver);
