import React from 'react'
import config from '../../config/default'

import './styles.css'

import QuestionForm from './QuestionForm/'
import QuestionList from './QuestionList/'

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: []
    }

    this.handleQuestionFormSubmit = this.handleQuestionFormSubmit.bind(this)
  }

  componentDidMount() {
    const url = `http://${config.api.hostname}:${config.api.port}/api/question`
    fetch(url, {
      method: 'GET',
      mode: 'cors',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ questions: data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  handleQuestionFormSubmit(formData) {
    const req = new XMLHttpRequest()
    const url = `http://${config.api.hostname}:${config.api.port}/api/question`
    req.open('POST', url)
    req.onload = (event) => {
      if (req.status === 200) {
        const newQuestion = JSON.parse(event.target.response)
        this.setState((state) => {
          return { questions: [...state.questions, newQuestion] }
        })
      }
    }
    req.send(formData)
  }

  render() {
    return (
      <div className="Question">
        <QuestionForm addNewQuestion={this.handleQuestionFormSubmit} />
        <QuestionList questions={this.state.questions} />
      </div>
    );
  }
}

export default Question;
