import React from 'react'

import './styles.css'

class TestEdit extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      name: '',
      start: null,
      end: null,
      questions: [],
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/test?total=10&subjects[Programming]=2&subjects[Math]=2')
      .then((data) => data.json())
      .then((test) => {
        this.setState((state) => {
          return {
            name: test.name,
            questions: test.questions,
          }
        })
      })
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
