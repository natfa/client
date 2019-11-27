import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import LoadingAnimation from '../../components/loading-animation';
import ExamSolverNavBar from '../../components/exam-solver-nav-bar';
import QuestionView from '../../components/exam-solver-question-view';
import SubmitPage from '../../components/exam-solver-submit-page';

import examApi from '../../api/exam';
import mediaApi from '../../api/media';

import bufferToBlob from '../../utils/bufferToBlob';
import ttsToString from '../../utils/ttsToString';

class ExamSolver extends React.Component {
  constructor(props) {
    super(props);

    // a reference to the Typography element that is the currently
    // selected question
    this.questionLinkRef = React.createRef();

    this.state = {
      exam: null,
      questionId: null,
      timeLeft: null,
    };

    this.tick = this.tick.bind(this);
    this.openSubmitPage = this.openSubmitPage.bind(this);
    this.selectQuestion = this.selectQuestion.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;

    // get exam
    examApi
      .getOneById(match.params.id)
      .then((response) => {
        if (!response.success) {
          console.error(response.data);
          return;
        }

        const exam = response.data;
        const questionId = exam.questions[0].id;

        // set exam state
        this.setState((state) => ({
          ...state,
          exam,
          questionId,
          timeLeft: exam.timeToSolve,
        }));

        // start timer
        this.timerID = setInterval(this.tick, 60000);

        // fetch question medias
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

              // add media to questions' state
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

  componentDidUpdate(_, prevState) {
    const { questionId } = this.state;

    // only execute if the question view component has changed
    if (questionId !== prevState.questionId) {
      this.questionLinkRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
      });
    }
  }

  componentWillUnmount() {
    // stop timer, stop memory leaks
    clearInterval(this.timerID);
  }

  /**
   * Should execute each minute,
   * keeps track of how much time is left fo the student to solve the exam
   */
  tick() {
    this.setState((state) => {
      const { timeLeft } = state;

      if (timeLeft.minutes === 0) {
        if (timeLeft.hours === 0) return state;

        timeLeft.hours -= 1;
        timeLeft.minutes = 59;
      } else {
        timeLeft.minutes -= 1;
      }

      return {
        ...state,
        timeLeft,
      };
    });
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

  openSubmitPage() {
    this.setState((state) => ({ ...state, questionId: null }));
  }

  render() {
    const { exam, questionId, timeLeft } = this.state;

    if (exam === null) {
      return <LoadingAnimation />;
    }

    const questionsLeft = exam.questions.reduce((acc, question) => {
      if (!question.selectedAnswerId) {
        return acc + 1;
      }

      return acc;
    }, 0);

    return (
      <div>
        {
          questionId === null
            ? (
              <SubmitPage
                onSubmit={() => console.error('Not implemented')}
                questionsLeft={questionsLeft}
              />
            ) : (
              <QuestionView
                question={exam.questions.find((q) => q.id === questionId)}
                selectAnswer={this.selectAnswer}
              />
            )
        }

        <ExamSolverNavBar
          ref={this.questionLinkRef}
          questions={exam.questions}
          questionId={questionId}
          selectQuestion={this.selectQuestion}
          timeLeft={ttsToString(timeLeft)}
          openSubmitPage={this.openSubmitPage}
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
