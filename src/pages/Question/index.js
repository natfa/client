import React from 'react'
import config from '../../config/default'

import './styles.css'

import QuestionForm from './QuestionForm/'
import QuestionList from './QuestionList/'
import EditQuestionModal from './EditQuestionModal'

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questionList: [],
      editing: false,
      questionId: null,
    }

    this.handleQuestionFormSubmit = this.handleQuestionFormSubmit.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.editQuestion = this.editQuestion.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
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
        this.setState({ questionList: data });
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
          return { questionList: [...state.questionList, newQuestion] }
        })
      }
    }
    req.send(formData)
  }

  closeModal() {
    this.setState({ editing: false })
  }

  editQuestion(questionId) {
    this.setState({ editing: true, questionId })
  }

  deleteQuestion(questionId) {
    const url = `http://${config.api.hostname}:${config.api.port}/api/question/${questionId}`

    fetch(url, {
      method: 'DELETE',
      mode: 'cors',
    })
      .then((response) => {
        if (response.ok) {
          alert('success')
          const questionList = this.state.questionList.filter(q => q.id !== questionId)
          this.setState({ questionList })
        }
      })
      .catch((err) => {
        alert('Cannot connect to server')
      })
  }

  render() {
    console.log(this.state.questionList)

    return (
      <div className="Question">

        {this.state.editing && 
          <EditQuestionModal
            show={this.state.editing}
            header={`Editing question ${this.state.questionId}`}
            handleClose={this.closeModal}
            questionId={this.state.questionId}
          />
        }

        <div className="form">
          <QuestionForm addNewQuestion={this.handleQuestionFormSubmit} />
        </div>
        <div className="list">
          <QuestionList
            questionList={this.state.questionList}
            handleEdit={this.editQuestion}
            handleDelete={this.deleteQuestion}
          />
        </div>
      </div>
    );
  }
}

export default Question;
