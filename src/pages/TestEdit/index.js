import React from 'react'

import './styles.css'

class TestEdit extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      name: this.props.name,
      questions: this.props.questions,
      start: this.props.start,
      end: this.props.end,
      timeToSolve: this.props.timeToSolve,
    }
  }

  render() {
    let questions = this.state.questions.map((question, i) => {
      return (
        <Question
          key={i}
          answers={question.answers}
          text={question.text}
        />
      )
    })

    return (
      <div className="TestEdit">
        <input type="text" placeholder="Test name" />
        <div>
          <input type="date" />
          <input type="date" />
        </div>

        <div className="QuestionsList">
          {questions}
        </div>
      </div>
    )
  }
}

function Question(props) {
  const answers = props.answers.map((answer, i) => {
    return <li key={i}>{answer}</li>
  })

  return (
    <div>
      <p>{props.text}</p>
      <ul>
        {answers}
      </ul>
    </div>
  )
}

export default TestEdit
