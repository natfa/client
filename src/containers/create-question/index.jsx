import React from 'react';
import uuid from 'uuid/v1';

import QuestionForm from '../../components/question-form';


class CreateQuestion extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      subjects: [
        { id: '1', name: 'Math' },
        { id: '2', name: 'Programming' },
      ],
      themes: [
        { id: '1', subjectid: '1', name: 'Algebra' },
        { id: '2', subjectid: '1', name: 'Geometry' },
        { id: '3', subjectid: '2', name: 'Web' },
        { id: '4', subjectid: '2', name: 'Soft' },
      ],
      subjectText: '',
      themeText: '',
      question: {
        subjectid: null,
        themeid: null,
        text: 'Some text',
        points: 0,
        answers: [
          { id: '1', text: 'Correct 1', correct: true },
          { id: '2', text: 'Correct 2', correct: true },
          { id: '3', text: 'Incorrect 3', correct: false },
          { id: '4', text: 'Incorrect 4', correct: false },
        ],
      },
    };

    this.handleSubjectChange = this.handleSubjectChange.bind(this);
    this.handleThemeChange = this.handleThemeChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handlePointsChange = this.handlePointsChange.bind(this);
    this.handleAnswerChange = this.handleAnswerChange.bind(this);
    this.handleAddAnswer = this.handleAddAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubjectChange(e) {
    const { value } = e.target;
    const { subjects } = this.state;

    const found = subjects.find((subject) => subject.name === value);

    this.setState((state) => {
      const newState = {
        ...state,
        subjectText: value,
        question: {
          ...state.question,
          subjectid: null,
        },
      };

      if (found) {
        newState.question.subjectid = found.id;
      }

      // TODO: Themes depend on subjects
      // as it currently is, the handleSubjectChange doesn't consider the theme input
      // think of the different scenarios possible and solve this problem
      console.error('Please implement TODO comment above this line');
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

      // TODO: Themes depend on subjects
      // as it currently is, the handleSubjectChange doesn't consider the theme input
      // think of the different scenarios possible and solve this problem
      console.error('Please implement TODO comment above this line');
      return { ...newState };
    });
  }

  handleTextChange(e) {
    const { value } = e.target;

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
    console.error('Not implemented');
  }

  handleSubmit(e) {
    e.preventDefault();
    console.error('Not implemented');
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
        onAddAnswer={this.handleAddAnswer}

        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default CreateQuestion;
