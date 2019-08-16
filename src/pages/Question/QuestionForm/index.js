import React from 'react';
import './styles.css';

// Answer signature
// answer: { text: String, correct: Boolean }

class QuestionForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      text: '',
      points: 0,
      answers: [],
      newAnswerText: '',
    }

    // Rebind this to local functions, cos javascript...
    this.onTextChange = this.onTextChange.bind(this);
    this.onPointsChange = this.onPointsChange.bind(this);
    this.onNewAnswerChange = this.onNewAnswerChange.bind(this);
    this.onAddNewAnswer = this.onAddNewAnswer.bind(this);
    this.onAnswerUpdate = this.onAnswerUpdate.bind(this);
    this.submitNewAnswer = this.submitNewAnswer.bind(this);
  }

  onTextChange(e) {
    this.setState({ text: e.target.value })
  }

  onPointsChange(e) {
    const value = e.target.value;

    if (isNaN(Number(value)))
      return;

    // We trim so that the input doesn't include any spaces
    // isNaN takes care of spaces between numbers
    this.setState({ points: value.trim() })
  }

  onNewAnswerChange(e) {
    this.setState({ newAnswerText: e.target.value })
  }

  onAddNewAnswer(e) {
    this.setState((state) => {
      return ({
        answers: [
          ...state.answers,
          {
            text: state.newAnswerText,
            correct: false,
          }
        ],
        newAnswerText: '',
      })
    })
  }

  onAnswerUpdate(index, newAnswer) {
    this.setState((state) => {
      return {
        answers: state.answers.map((answer, i) => {
          if (i === index)
            return { text: newAnswer.text, correct: newAnswer.correct }
          return answer
        })
      }
    })
  }

  submitNewAnswer() {
    const url = 'http://localhost:3001/api/question'
    const correctAnswers = this.state.answers.filter((answer) => answer.correct).map((answer) => answer.text);
    const incorrectAnswers = this.state.answers.filter((answer) => !(answer.correct)).map((answer) => answer.text);


    const data = {
      text: this.state.text,
      incorrectAnswers: incorrectAnswers,
      correctAnswers: correctAnswers,
      points: Number(this.state.points),
    }

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((answer) => {
        answer.json()
          .then((data) => {
            console.log(data);
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      })
  }

  render () {
    const answerFields = this.state.answers.map((answer, i) => {
      return (
        <AnswerField
          value={answer.text}
          correct={answer.correct}
          key={i}
          index={i}
          onUpdate={this.onAnswerUpdate}
        />
      )
    })

    return (
      <div className="QuestionForm">
        <textarea maxLength="150" onChange={this.onTextChange} value={this.state.text} />
        <div>
          <input
            name="points"
            type="text"
            value={this.state.points}
            onChange={this.onPointsChange}
          />
        </div>
        <div className="inputter">
          <input
            type="text"
            value={this.state.newAnswerText}
            onChange={this.onNewAnswerChange}
          />
          <button onClick={this.onAddNewAnswer}>Add</button> or
          <button onClick={this.submitNewAnswer}>Save question</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Answers</th>
              <th>Correct</th>
            </tr>
          </thead>
          <tbody>
            {answerFields}
          </tbody>
        </table>
      </div>
    );
  }
}

class AnswerField extends React.Component {
  constructor(props) {
    super(props);

    this.onTextChange = this.onTextChange.bind(this);
    this.onCorrectChange = this.onCorrectChange.bind(this);
  }

  onTextChange(e) {
    this.props.onUpdate(this.props.index, {
      text: e.target.value,
      correct: this.props.correct,
    })
  }

  onCorrectChange(e) {
    this.props.onUpdate(this.props.index, {
      text: this.props.value,
      correct: e.target.checked,
    })
  }

  render() {
    return (
      <tr>
        <td>
          <input
            type="text"
            value={this.props.value}
            onChange={this.onTextChange}
          />
        </td>
        <td>
          <input
            type="checkbox"
            checked={this.props.correct}
            onChange={this.onCorrectChange}
          />
        </td>
      </tr>
    );
  }
}

export default QuestionForm;
