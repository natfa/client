import React from 'react'
import dispatcher from '../../dispatcher/'

import './styles.css'

import QuestionForm from '../../components/QuestionForm'
import QuestionList from '../../components/QuestionList'

class QuestionsPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questions: [],
      subjects: [],
    }

    this.getThemes = this.getThemes.bind(this)

    this.createQuestion = this.createQuestion.bind(this)
    this.deleteQuestion = this.deleteQuestion.bind(this)
  }

  componentDidMount() {
    dispatcher.questions.getAll()
      .then((res) => {
        if (!res.success) {
          alert('Implement proper user feedback!')
          console.log(res)
          return
        }

        this.setState({ questions: res.data })
      })
      .catch((err) => {
        console.error(err)
      })

    dispatcher.subjects.getAll()
      .then((res) => {
        if (!res.success) {
          alert('Implement proper user feedback!')
          console.error(res)
          return
        }

        this.setState({ subjects: res.data })
      })
      .catch((err) => {
      })
  }

  getThemes(subject) {
    return new Promise((resolve, reject) => {
      dispatcher.themes.getAllBySubject(subject)
        .then((res) => {
          if (!res.success) {
            alert('Implement proper user feedback!')
            console.error(res)
            return
          }

          return resolve(res.data)
        })
        .catch((err) => {
          alert('Implement proper user feedback!')
          console.error(err)
        })
    })
  }

  createQuestion(formData) {
    dispatcher.questions.createOne(formData)
      .then((res) => {
        if (!res.success) {
          alert('Implement proper user feedback!')
          console.error(res)
        }

        this.setState((state) => ({ questions: [...state.questions, res.data] }))
      })
      .catch((err) => {
        alert('Implement proper user feedback!')
        console.error(err)
      })
  }

  deleteQuestion(id) {
    dispatcher.questions.deleteById(id)
      .then((res) => {
        if (!res.success) {
          alert('Implement proper user feedback!')
          console.error(res)
        }

        this.setState((state) => {
          const questions = state.questions.filter((q) => q.id !== id)
          return { questions: questions }
        })
      })
      .catch((err) => {
        alert('Implement proper user feedback!')
        console.error(err)
      })
  }

  render() {
    return (
      <div className="QuestionsPage">
        <div className="form">
          <QuestionForm
            subjects={this.state.subjects}
            getThemes={this.getThemes}
            handleSubmit={this.createQuestion}
          />
        </div>
        <div className="list">
          <QuestionList
            subjects={this.state.subjects}
            questionList={this.state.questions}
            handleEdit={() => alert('Implement handle edit question')}
            handleDelete={this.deleteQuestion}
          />
        </div>
      </div>
    )
  }
}

export default QuestionsPage
