import React from 'react';
import uuid from 'uuid/v1';

import QuestionForm from '../../components/question-form';

import questionAPI from '../../api/question';
import subjectAPI from '../../api/subject';
import themeAPI from '../../api/theme';


class CreateQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: [],
      themes: [],
      subjectText: '',
      themeText: '',
      question: {
        subjectid: null,
        themeid: null,
        text: '',
        points: 0,
        answers: [],
        media: [],
      },
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
  }

  async componentDidMount() {
    try {
      const subjects = await subjectAPI.getAll();

      if (!subjects) {
        console.error('Subjects is undefined...');
        return;
      }

      this.setState((state) => ({
        ...state,
        subjects,
      }));
    } catch (err) {
      console.error(err);
    }
  }

  async handleSubjectChange(e) {
    const { value } = e.target;
    const { subjects } = this.state;

    const found = subjects.find((subject) => subject.name === value);

    if (found) {
      try {
        const themes = await themeAPI.getAllBySubjectid(found.id);
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
        subjectText: value,
        themeText: '',
        question: {
          ...state.question,
          subjectid: null,
          themeid: null,
        },
      };

      if (found) {
        newState.question.subjectid = found.id;
      }

      return { ...newState };
    });
  }

  handleThemeChange(e) {
    const { value } = e.target;
    const { themes, question } = this.state;

    const found = themes
      .filter((t) => t.subjectid === question.subjectid)
      .find((theme) => theme.name === value);

    this.setState((state) => {
      const newState = {
        ...state,
        themeText: value,
        question: {
          ...state.question,
          themeid: null,
        },
      };

      if (found) {
        newState.question.themeid = found.id;
      }

      return { ...newState };
    });
  }

  handleTextChange(e) {
    const { value } = e.target;

    if (value.length > 150) return;

    this.setState((state) => (
      {
        ...state,
        question: {
          ...state.question,
          text: value,
        },
      }
    ));
  }

  handlePointsChange(e) {
    const { value } = e.target;

    if (Number.isNaN(Number(value))) {
      return;
    }

    const numericalValue = Number(value);

    this.setState((state) => (
      {
        ...state,
        question: {
          ...state.question,
          points: numericalValue,
        },
      }
    ));
  }

  handleAddAnswer(correct) {
    const id = uuid();

    this.setState((state) => ({
      ...state,
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

  async handleSubmit(e) {
    e.preventDefault();
    const { subjectText, themeText, question } = this.state;

    const formData = new FormData();

    formData.append('text', question.text);
    formData.append('points', question.points);
    formData.append('subjectName', subjectText);
    formData.append('themeName', themeText);

    question.answers.map((answer) => formData.append('answers', answer.text));
    question.media.map((media) => formData.append('media', media.file));

    try {
      const response = await questionAPI.createOne(formData);
      if (!response.success) {
        console.error(response.data);
      } else {
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  render() {
    const {
      subjects,
      subjectText,
      themes,
      themeText,
      question,
    } = this.state;

    return (
      <QuestionForm
        subjects={subjects}
        subject={subjectText}
        onSubjectChange={this.handleSubjectChange}

        themes={themes.filter((theme) => theme.subjectid === question.subjectid)}
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
      />
    );
  }
}

export default CreateQuestion;
