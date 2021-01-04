import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { Redirect, withRouter } from 'react-router-dom';

import LoadingAnimation from '../../components/loading-animation';
import ExamSolverNavBar from '../../components/exam-solver-nav-bar';
import QuestionView from '../../components/exam-solver-question-view';
import SubmitPage from '../../components/exam-solver-submit-page';

import solveApi from '../../api/solve';
import ttsToString from '../../utils/ttsToString';

class ExamSolver extends React.Component {
  constructor(props) {
    super(props);

    // a reference to the Typography element that is the currently
    // selected question
    this.questionLinkRef = React.createRef();

    this.state = {
      exam: null,
      questions: null,
      questionId: null,
      timeLeft: null,
      solved: false,
    };

    this.tick = this.tick.bind(this);
    this.openSubmitPage = this.openSubmitPage.bind(this);
    this.selectQuestion = this.selectQuestion.bind(this);
    this.selectAnswer = this.selectAnswer.bind(this);
    this.submitExam = this.submitExam.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;

    solveApi
      .getExamById(match.params.id)
      .then((exam) => {
        if (exam === null) {
          console.error('Exam is null, probably id not found');
          return;
        }

        const { questions } = exam.studentExams[0];
        const questionId = questions[0].id;


        this.setState((state) => ({
          ...state,
          exam,
          questions,
          questionId,
          timeLeft: exam.timeToSolve,
        }));

        this.timerID = setInterval(this.tick, 60000);
      });
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

      const newTimeLeft = dayjs.duration(timeLeft).subtract(1, 'minute').seconds();

      return {
        ...state,
        timeLeft: newTimeLeft,
      };
    });
  }

  selectQuestion(questionId) {
    const { questions } = this.state;

    const question = questions.find((q) => q.id === questionId);
    if (!question) return;

    this.setState((state) => ({
      ...state,
      questionId: question.id,
    }));
  }

  selectAnswer(questionId, answerId) {
    this.setState((state) => ({
      ...state,
      questions: state.questions.map((q) => {
        if (q.questionId !== questionId) return q;

        return {
          ...q,
          givenAnswerId: answerId,
        };
      }),
    }));
  }

  openSubmitPage() {
    this.setState((state) => ({ ...state, questionId: null }));
  }

  submitExam() {
    const { exam } = this.state;

    solveApi.submitExam({
      examId: exam.id
    });

    this.setState((state) => ({
      ...state,
      solved: true,
    }));
  }

  render() {
    const {
      exam,
      questions,
      questionId,
      timeLeft,
      solved,
    } = this.state;

    if (solved) {
      return <Redirect push to="/" />;
    }

    if (exam === null) {
      return <LoadingAnimation />;
    }

    const questionsLeft = questions.reduce((acc, question) => {
      if (!question.givenAnswerId) {
        return acc + 1;
      }

      return acc;
    }, 0);

    const question = questions.find(q => q.id === questionId);

    return (
      <div>
        {
          questionId === null
            ? (
              <SubmitPage
                onSubmit={this.submitExam}
                questionsLeft={questionsLeft}
              />
            ) : (
              <QuestionView
                question={question.question}
                givenAnswerId={question.givenAnswerId}
                selectAnswer={(qId, aId) => {
                  this.selectAnswer(qId, aId);
                  const studentExamId = exam.studentExams[0].id;
                  solveApi.answerQuestion({
                    studentExamId,
                    questionId: qId,
                    givenAnswerId: aId,
                  });
                }}
              />
            )
        }

        <ExamSolverNavBar
          ref={this.questionLinkRef}
          questions={questions}
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
