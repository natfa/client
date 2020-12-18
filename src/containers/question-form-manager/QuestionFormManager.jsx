import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v1';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import QuestionForm from '../../components/question-form';

import questionApi from '../../api/question';
import mediaApi from '../../api/media';
import moduleApi from '../../api/module';
import themeApi from '../../api/theme';

import bufferToBlob from '../../utils/bufferToBlob';

class QuestionFormManager extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: [],
      themes: [],
      subjectText: '',
      themeText: '',
      question: {
        subjectId: null,
        themeId: null,
        text: '',
        points: 0,
        answers: [],
        media: [],
      },
      subjectError: undefined,
      themeError: undefined,
      textError: undefined,
      pointsError: undefined,
      correctAnswersError: undefined,
      incorrectAnswersError: undefined,

      loading: false,
      snackbarOpen: false,
    };

    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleThemeChange = this.handleThemeChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handlePointsChange = this.handlePointsChange.bind(this);

    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleAddAnswer = this.handleAddAnswer.bind(this);
    this.handleAnswerDelete = this.handleAnswerDelete.bind(this);

    this.handleMediaUpload = this.handleMediaUpload.bind(this);
    this.handleMediaDelete = this.handleMediaDelete.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  componentDidMount() {
    const { question } = this.props;

    if (question) {
      this.setState((state) => ({
        ...state,
        subjectText: question.subject.name,
        themeText: question.theme.name,
        question: {
          ...state.question,
          subjectId: question.subject.id,
          themeId: question.theme.id,
          text: question.text,
          points: question.points,
          answers: question.answers,
        },
      }));

      mediaApi
        .getManyByQuestionId(question.id)
        .then((buffers) => {
          if (buffers === null) {
            console.error('Media is null');
            return;
          }

          if (buffers.length === 0) {
            return;
          }

          const media = buffers.map((buffer) => bufferToBlob(buffer));

          this.setState((state) => ({
            ...state,
            question: {
              ...state.question,
              media,
            },
          }));
        })
        .catch((err) => console.error(err));

      themeApi
        .getAllBySubjectId(question.subject.id)
        .then((themes) => {
          this.setState((state) => ({
            ...state,
            themes,
          }));
        })
        .catch((err) => console.error(err));
    }

    moduleApi
      .getAll()
      .then((subjects) => {
        this.setState((state) => ({
          ...state,
          subjects,
        }));
      })
      .catch((err) => console.error(err));
  }

  async handleSubjectChange(e) {
    const { value } = e.target;
    const { subjects } = this.state;

    const found = subjects.find((subject) => subject.name === value);

    if (found) {
      try {
        const themes = await themeApi.getAllBySubjectId(found.id);
        this.setState((state) => ({
          ...state,
          themes,
        }));
      } catch (err) {
        console.error(err);
      }
    }

    this.setState((state) => {
      const newState = {
        ...state,
        subjectError: undefined,
        subjectText: value,
        themeText: '',
        question: {
          ...state.question,
          subjectId: null,
          themeId: null,
        },
      };

      if (found) {
        newState.question.subjectId = found.id;
      }

      return { ...newState };
    });
  }

  handleThemeChange(e) {
    const { value } = e.target;
    const { themes, question } = this.state;

    const found = themes
      .filter((t) => t.subject.id === question.subjectId)
      .find((theme) => theme.name === value);

    this.setState((state) => {
      const newState = {
        ...state,
        themeError: undefined,
        themeText: value,
        question: {
          ...state.question,
          themeId: null,
        },
      };

      if (found) {
        newState.question.themeId = found.id;
      }

      return { ...newState };
    });
  }

  handleTextChange(e) {
    const { value } = e.target;

    if (value.length > 500) return;

    this.setState((state) => ({
      ...state,
      textError: undefined,
      question: {
        ...state.question,
        text: value,
      },
    }));
  }

  handlePointsChange(e) {
    const { value } = e.target;

    if (Number.isNaN(Number(value))) {
      return;
    }

    const numericalValue = Number(value);

    this.setState((state) => ({
      ...state,
      pointsError: undefined,
      question: {
        ...state.question,
        points: numericalValue,
      },
    }));
  }

  handleAddAnswer(correct) {
    const id = uuid();

    this.setState((state) => ({
      ...state,
      correctAnswersError: correct ? undefined : state.correctAnswersError,
      incorrectAnswersError: correct ? state.correctAnswersError : undefined,
      question: {
        ...state.question,
        answers: [...state.question.answers, { id, text: '', correct }],
      },
    }));
  }

  handleAnswerChange(e, answerid) {
    const { value } = e.target;
    const { question } = this.state;

    const answers = question.answers.map((answer) => {
      if (answer.id === answerid) {
        return {
          id: answer.id,
          text: value,
          correct: answer.correct,
        };
      }

      return answer;
    });

    this.setState((state) => ({
      ...state,
      question: {
        ...state.question,
        answers,
      },
    }));
  }

  handleAnswerDelete(answerid) {
    const { question } = this.state;

    const answers = question.answers.filter((a) => a.id !== answerid);

    this.setState((state) => ({
      ...state,
      question: {
        ...state.question,
        answers,
      },
    }));
  }

  handleMediaUpload(e) {
    const { files } = e.target;

    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      const url = window.URL.createObjectURL(file);

      this.setState((state) => ({
        ...state,
        question: {
          ...state.question,
          media: [
            ...state.question.media,
            { url, file },
          ],
        },
      }));
    }
  }

  handleMediaDelete(mediaURL) {
    const { question } = this.state;

    const media = question.media.filter((m) => m.url !== mediaURL);

    this.setState((state) => ({
      ...state,
      question: {
        ...state.question,
        media,
      },
    }));
  }

  handleSubmit(e) {
    e.preventDefault();

    // start loading animation
    this.setState((state) => ({ ...state, loading: true }));

    const { subjectText, themeText, question: questionState } = this.state;
    const { question, onSubmit } = this.props;

    const correct = questionState.answers.filter((a) => a.correct);
    const incorrect = questionState.answers.filter((a) => !a.correct);

    const formData = new FormData();

    formData.append('text', questionState.text);
    formData.append('points', questionState.points);
    formData.append('moduleName', subjectText);
    formData.append('themeName', themeText);

    correct.map((a) => formData.append('correctAnswers[]', a.text));
    incorrect.map((a) => formData.append('incorrectAnswers[]', a.text));
    questionState.media.map((media) => formData.append('media', media.file));

    if (question && onSubmit) {
      formData.append('id', question.id);
      onSubmit(formData);
      return;
    }

    questionApi
      .createOne(formData)
      .then((response) => {
        if (!response.success) {
          const {
            subject,
            theme,
            text,
            points,
            correctAnswers,
            incorrectAnswers,
          } = response.data;

          this.setState((state) => ({
            ...state,
            loading: false,
            subjectError: subject,
            themeError: theme,
            textError: text,
            pointsError: points,
            correctAnswersError: correctAnswers,
            incorrectAnswersError: incorrectAnswers,
          }));
          return;
        }

        this.setState((state) => ({
          ...state,
          loading: false,
          snackbarOpen: true,
          question: {
            subjectId: null,
            themeId: null,
            text: '',
            points: 0,
            answers: [],
            media: [],
          },
        }));
      })
      .catch((err) => console.error(err));
  }

  closeSnackbar() {
    this.setState((state) => ({ ...state, snackbarOpen: false }));
  }

  render() {
    const {
      loading,
      subjects,
      subjectText,
      themes,
      themeText,
      question,

      subjectError,
      themeError,
      textError,
      pointsError,
      correctAnswersError,
      incorrectAnswersError,

      snackbarOpen,
    } = this.state;

    return (
      <>
        <QuestionForm
          subjectError={subjectError}
          themeError={themeError}
          textError={textError}
          pointsError={pointsError}
          correctAnswersError={correctAnswersError}
          incorrectAnswersError={incorrectAnswersError}

          subjects={subjects}
          subject={subjectText}
          onSubjectChange={this.handleSubjectChange}

          themes={themes.filter((theme) => theme.subject.id === question.subjectId)}
          theme={themeText}
          onThemeChange={this.handleThemeChange}

          text={question.text}
          onTextChange={this.handleTextChange}

          points={question.points}
          onPointsChange={this.handlePointsChange}

          answers={question.answers}
          onAnswerChange={this.handleAnswerChange}
          onAnswerDelete={this.handleAnswerDelete}
          onAddAnswer={this.handleAddAnswer}

          media={question.media}
          onMediaUpload={this.handleMediaUpload}
          onMediaDelete={this.handleMediaDelete}

          onSubmit={this.handleSubmit}
          loading={loading}
        />
        <Snackbar
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'bottom',
          }}
          autoHideDuration={3000}
          open={snackbarOpen}
          onClose={this.closeSnackbar}
        >
          <SnackbarContent
            style={{
              backgroundColor: 'green',
            }}
            message={<span>Успешна операция.</span>}
            action={[
              <IconButton
                key="close"
                aria-label="close"
                onClick={this.closeSnackbar}
                color="inherit"
              >
                <CloseIcon />
              </IconButton>,
            ]}
          />
        </Snackbar>
      </>
    );
  }
}

QuestionFormManager.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.string,
    points: PropTypes.number,
    text: PropTypes.string,
    subject: PropTypes.object,
    theme: PropTypes.object,
    answers: PropTypes.arrayOf(PropTypes.object),
  }),
  onSubmit: PropTypes.func,
};

QuestionFormManager.defaultProps = {
  onSubmit: undefined,
  question: undefined,
};

export default QuestionFormManager;
