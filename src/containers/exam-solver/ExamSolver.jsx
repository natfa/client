import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import LoadingAnimation from '../../components/loading-animation';
import ExamSolverNavBar from '../../components/exam-solver-nav-bar';
import QuestionView from '../../components/exam-solver-question-view';

import examApi from '../../api/exam';
import mediaApi from '../../api/media';

import bufferToBlob from '../../utils/bufferToBlob';

class ExamSolver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      exam: null,
      questionId: null,
    };

    this.selectQuestion = this.selectQuestion.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;

    examApi
      .getOneById(match.params.id)
      .then((response) => {
        if (!response.success) {
          console.error(response.data);
          return;
        }

        const exam = response.data;
        const questionId = exam.questions[0].id;

        this.setState((state) => ({
          ...state,
          exam,
          questionId,
        }));

        exam.questions.forEach((question) => {
          mediaApi
            .getManyByQuestionId(question.id)
            .then((mediaResponse) => {
              if (!mediaResponse.success) {
                console.error(mediaResponse.data);
                return;
              }

              if (mediaResponse.data.length === 0) return;

              const media = mediaResponse.data
                .map((buffer) => bufferToBlob(buffer));

              this.setState((state) => {
                const questions = state.exam.questions.map((q) => {
                  if (q.id !== question.id) return q;

                  return {
                    ...q,
                    media,
                  };
                });

                return {
                  ...state,
                  exam: {
                    ...state.exam,
                    questions,
                  },
                };
              });
            })
            .catch((err) => console.error(err));
        });
      })
      .catch((err) => console.error(err));
  }

  selectQuestion(questionId) {
    const { exam } = this.state;

    const question = exam.questions.find((q) => q.id === questionId);
    if (!question) return;

    this.setState((state) => ({
      ...state,
      questionId: question.id,
    }));
  }

  selectAnswer(questionId, answerId) {
    this.setState((state) => {
      const questions = state.exam.questions.map((question) => {
        if (question.id !== questionId) return question;

        return {
          ...question,
          selectedAnswerId: answerId,
        };
      });

      return {
        ...state,
        exam: {
          ...state.exam,
          questions,
        },
      };
    });
  }

  render() {
    const { exam, questionId } = this.state;

    if (exam === null) {
      return <LoadingAnimation />;
    }

    return (
      <div>
        <QuestionView
          question={exam.questions.find((q) => q.id === questionId)}
          selectAnswer={this.selectAnswer}
        />

        <ExamSolverNavBar
          questions={exam.questions}
          questionId={questionId}
          selectQuestion={this.selectQuestion}
          onSubmit={() => console.error('Not implemented')}
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
