import React from 'react';
import uuid from 'uuid/v1';

import QuestionForm from '../../components/question-form';
import questionAPI from '../../api/question';


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
    this.handleAnswerDelete = this.handleAnswerDelete.bind(this);
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

  async handleSubmit(e) {
    e.preventDefault();
    const { subjects, themes, question } = this.state;

    const data = {
      text: question.text,
      points: question.points,
      subject: (subjects.find((s) => s.id === question.subjectid)).name,
      theme: (themes.find((t) => t.id === question.themeid)).name,
      correctAnswers: question.answers.filter((a) => a.correct).map((a) => a.text),
      incorrectAnswers: question.answers.filter((a) => !a.correct).map((a) => a.text),
    };

    const jsonData = JSON.stringify(data);

    console.log(jsonData);
    console.log(data);

    try {
      const response = await questionAPI.createOne(jsonData);
      if (!response.success) {
        alert('You did something wrong');
        console.error(response.data);
      } else {
        alert('Success!');
        console.log(response.data);
      }
    } catch (err) {
      alert('Something went wrong');
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

        onSubmit={this.handleSubmit}
      />
    );
  }
}

export default CreateQuestion;
